import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../Colors';
const TodoModal = ({ closeModal, list, updateList }) => {
    const [name, setName] = useState(list.name)
    const [color, setColor] = useState(list.color)
    const [todos, setTodos] = useState(list.todos)
    const [newTodo, setNewTodo] = useState('')
    // Đêm số task và task hoàn thành
    const taskCount = todos.length
    const taskCompletedCount = todos.filter(todo => todo.completed).length
    // Check completed
    const toggleTodoCompleted = (index) => {
        let listTodo = list;
        listTodo.todos[index].completed = !listTodo.todos[index].completed
        
        fetch(`https://6385b0aabeaa6458266587ad.mockapi.io/api/ListTodo/${list.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listTodo)
        });
        updateList(listTodo)
    }
    // Add todo
    const addTodo = () => {
        if (newTodo == '') {
            alert("Bạn Phải Nhập")
        } else {
            let listTodo = list;
            list.todos.push({ title: newTodo, completed: false })
            fetch(`https://6385b0aabeaa6458266587ad.mockapi.io/api/ListTodo/${list.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listTodo)
        });
            updateList(listTodo)
            setNewTodo("")
        }
    }
    // Render các task
    const renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => {
                    toggleTodoCompleted(index)
                }}>
                    <Ionicons name={todo.completed ? 'ios-square' : 'ios-square-outline'} size={24} color={Colors.gray} style={{ width: 32 }} />
                </TouchableOpacity>
                <Text style={[styles.todo, { textDecorationLine: todo.completed ? 'line-through' : 'none', color: todo.completed ? Colors.gray : Colors.black }]}>{todo.title}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }} onPress={closeModal}>
                <AntDesign name='close' size={24} color={Colors.black} />
            </TouchableOpacity>
            <View style={[styles.section, styles.header]}>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.taskCount}>
                        {taskCompletedCount} of {taskCount} task
                    </Text>
                </View>
            </View>
            <View style={[styles.section, { flex: 3 }]} >
                <FlatList
                    data={todos}
                    renderItem={({ item, index }) => renderTodo(item, index)}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior="padding">
                <TextInput style={[styles.input, { borderColor: color }]} onChangeText={text => { setNewTodo(text) }} value={newTodo} />
                <TouchableOpacity style={[styles.addTodo, { backgroundColor: color }]} onPress={addTodo}>
                    <AntDesign name='plus' size={16} color={Colors.white} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default TodoModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    section: {
        flex: 1,
        alignSelf: 'stretch'
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: Colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: Colors.gray,
        fontWeight: '600'
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todo: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: 16
    }
})
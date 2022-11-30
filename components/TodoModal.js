import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, FlatList, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../Colors';
import { useFonts, Sen_400Regular, Sen_700Bold, Sen_800ExtraBold,Roboto } from '@expo-google-fonts/sen';

const TodoModal = ({ closeModal, list, updateList,updateAll }) => {
    const [name, setName] = useState(list.name)
    const [color, setColor] = useState(list.color)
    const [todos, setTodos] = useState(list.todos)
    const [newTodo, setNewTodo] = useState('')
    let [fontsLoaded] = useFonts({
        Sen_400Regular,
        Sen_700Bold,
        Sen_800ExtraBold,
        Roboto,
      });
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
    // Delete task lớn
    const deleteTodoList = () => {
        let listTodo = list;
        fetch(`https://6385b0aabeaa6458266587ad.mockapi.io/api/ListTodo/${list.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listTodo)
        });
        updateAll();
        closeModal();
    }
    // Delete task nhỏ
    const deleteTodoModal = (index) => {
        let listTodo = list;
        listTodo.todos.splice(index, 1);
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
    // Render các task
    const renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer} >
                <TouchableOpacity onPress={() => {
                    toggleTodoCompleted(index)
                }}>
                    <Ionicons name={todo.completed ? 'ios-square' : 'ios-square-outline'} size={24} color={Colors.gray} style={{ width: 32 }} />
                </TouchableOpacity>
                <Text style={[styles.todo, { textDecorationLine: todo.completed ? 'line-through' : 'none', color: todo.completed ? Colors.gray : Colors.black }]}>{todo.title}</Text>
                <TouchableOpacity style={styles.btnDelete} onPress={() => {
                    Alert.alert(
                        //title
                        'Xóa Task Nhỏ',
                        //body
                        'Bạn có chắc muốn xóa ?',
                        [
                            { text: 'Yes', onPress: () => deleteTodoModal(index) },
                            {
                                text: 'No',
                                onPress: () => alert("Bạn Đã Chọn Không Xóa"),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false }
                        //clicking out side of alert will not cancel
                    );
                }}>
                    <Ionicons name='remove-circle' size={24} color={Colors.red} style={{ width: 32 ,display:todo.completed ? 'none':'flex' }} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ position: 'absolute', top: 32, right: 32, backgroundColor: Colors.red, zIndex: 100, padding: 5 }} onPress={() => {
                Alert.alert(
                    //title
                    'Xóa Task Lớn',
                    //body
                    'Bạn có chắc muốn xóa, vì nếu xóa bạn sẽ xóa hết các task nhỏ bên trong (nếu có) ?',
                    [
                        { text: 'Yes', onPress: () => deleteTodoList() },
                        {
                            text: 'No',
                            onPress: () => alert("Bạn Đã Chọn Không Xóa"),
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false }
                    //clicking out side of alert will not cancel
                );
            }}>
                <AntDesign name='close' size={24} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute', top: 32, left: 32, backgroundColor: color, padding: 5 }} onPress={closeModal}>
                <AntDesign name='back' size={24} color={Colors.white} />
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
        fontFamily: 'Roboto',
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
        alignItems: 'center',
    },
    todo: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: 16
    },
    btnDelete: {
        position: 'absolute',
        right: 0
    }
})
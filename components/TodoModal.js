import { StyleSheet, Text, View,KeyboardAvoidingView,TouchableOpacity, SafeAreaView, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import {AntDesign,Ionicons} from '@expo/vector-icons';
import Colors from '../Colors';
const TodoModal = ({ closeModal,list }) => {
    const [name,setName] = useState(list.name)
    const [color,setColor] = useState(list.color)
    const [todos,setTodos] = useState(list.todos)

    // Đêm số task và task hoàn thành
    const taskCount = todos.length
    const taskCompletedCount = todos.filter(todo => todo.completed).length
    // Render các task
    const renderTodo = (todo) =>{
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity>
                    <Ionicons name='ios-square-outline' size={24} color={Colors.gray} style={{width:32}} />
                </TouchableOpacity>
                <Text>{todo.title}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container} >
            <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }} onPress={closeModal}>
                <AntDesign name='close' size={24} color={Colors.black} />
            </TouchableOpacity>
            <View style={[styles.section,styles.header]}>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.taskCount}>
                        {taskCompletedCount} of {taskCount} task
                    </Text>
                </View>
            </View>
            <View style={[styles.section,{flex:3}]} >
                <FlatList
                    data={todos} 
                    renderItem={({item})=> renderTodo(item) }
                    keyExtractor={item => item.title}
                    contentContainerStyle={{paddingHorizontal:32,paddingVertical:64}}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <KeyboardAvoidingView style={[styles.section,styles.footer]} behavior="padding">
                <TextInput style={[styles.input,{borderColor:color}]} />
                <TouchableOpacity style={[styles.addTodo,{backgroundColor:color}]}>
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
    section:{
        flex:1,
        alignSelf:'stretch'
    },
    header:{
        justifyContent:'flex-end',
        marginLeft:64,
        borderBottomWidth:3,
    },
    title:{
        fontSize:30,
        fontWeight:'800',
        color:Colors.black,
    },
    taskCount:{
        marginTop:4,
        marginBottom:16,
        color:Colors.gray,
        fontWeight:'600'
    },
    footer:{
        paddingHorizontal:32,
        flexDirection:'row',
        alignItems:'center'
    },
    input:{
        flex:1,
        height:48,
        borderWidth:StyleSheet.hairlineWidth,
        borderRadius:6,
        marginRight:8,
        paddingHorizontal:8
    },
    addTodo:{
        borderRadius:4,
        padding:16,
        alignItems:'center',
        justifyContent:'center'
    },
    todoContainer:{
        paddingVertical:16,
        flexDirection:'row',
        alignItems:'center'
    }
})
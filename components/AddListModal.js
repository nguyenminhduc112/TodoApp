import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {AntDesign} from '@expo/vector-icons';
import Colors from '../Colors';
import tempData from '../tempData';
const AddListModal = ({closeModal,addList}) => {
  const backgroundColor = ['#5CD859','#24A6D9','#595BD9','#8022D9','#D159D8','#D85963','#D88559']
  const [pointColor,setPointColor] = useState(backgroundColor[0])
  const [nameTitle,setNameTitle] = useState("")

  const renderColors = ()=>{
    return backgroundColor.map(color =>{
      return(
        <TouchableOpacity key={color} style={[styles.colorSelect,{backgroundColor:color}]} onPress={()=>{
          setPointColor(color)
        }}></TouchableOpacity>
      )
    })
  }

  const createTodo = () =>{
    const name = nameTitle;
    const color = pointColor;
    const list = {name,color}
    addList(list)
    setNameTitle("")
    setPointColor(backgroundColor[0])
    closeModal()
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={{position:'absolute',top:64,right:32}} onPress={closeModal}>
            <AntDesign name='close' size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={{alignSelf:"stretch",marginHorizontal:32}}>
          <Text style={styles.title}>Create Todo List</Text>
          <TextInput style={styles.input} placeholder="List Name?" value={nameTitle} onChangeText={(txt)=>{
            setNameTitle(txt)
          }} />
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>
            {renderColors()}
          </View>
          <TouchableOpacity style={[styles.create,{backgroundColor:pointColor}]} onPress={()=>{
            createTodo()
          }}>
            <Text style={{color:Colors.white,fontWeight:'600'}}>Create!</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default AddListModal

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:'center'
  },
  title:{
    color:Colors.black,
    fontSize:28,
    fontWeight:'800',
    alignSelf:'center',
    marginBottom:16,
  },
  input:{
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    borderRadius:6,
    height:50,
    marginTop:8,
    paddingHorizontal:16,
    fontSize:18
  },
  create:{
    marginTop:24,
    height:50,
    borderRadius:6,
    alignItems:'center',
    justifyContent:'center'
  },
  colorSelect:{
    width:30,
    height:30,
    borderRadius:4,
  }
})
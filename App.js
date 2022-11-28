import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { useState } from 'react';
// Global
import colors from "./Colors";
import tempData from './tempData';
// Component
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

export default function App() {
  // Điều kiện để mở giai diện thêm task (modal)
  const [ViewModal,setVietModal] = useState(false)
  // Biến List Todo
  const [listTodo,setListTodo] = useState(tempData)
  // Render ra giao diện task lớn
  const renderList = (list) =>{
    return <TodoList list={list} updateList={updateList} />
  }
  // Add todo 
  const addList = (list) =>{
    setListTodo([...listTodo,{...list,id: listTodo.length + 1,todos:[]}])
  }
  // Update todo 
  const updateList = (list) =>{
    setListTodo(listTodo.map(item =>{
      return item.id === list.id ? list : item
    }))
  }
  return (
    <View style={styles.container}>
      <Modal animationType='slide' visible={ViewModal} onRequestClose={()=>{
        setVietModal(false)
      }}>
        <AddListModal closeModal={()=>{
          setVietModal(false)
        }} addList={addList} />
      </Modal>
      <View style={{flexDirection:"row"}}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo <Text style={{fontWeight:"300",color:colors.blue,}}>List</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{marginVertical:48}}>
        <TouchableOpacity style={styles.addList} onPress={()=>{
          setVietModal(true)
        }}>
          <AntDesign name='plus' size={16} color={colors.blue} />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>
      <View style={{height:275,paddingLeft:32}}>
        <FlatList
         data={listTodo} 
         keyExtractor={item=> item.name} 
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         renderItem={({item})=> renderList(item)}
         keyboardShouldPersistTaps="always"
         />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider:{
    backgroundColor: colors.lightBlue,
    height:1,
    flex:1,
    alignSelf:'center'
  },
  title:{
    fontSize:38,
    fontWeight:"800",
    color:colors.black,
    paddingHorizontal:64
  },
  addList:{
    borderWidth:2,
    borderColor:colors.lightBlue,
    borderRadius:4,
    padding:16,
    alignItems:"center",
  },
  add:{
    color:colors.blue,
    fontWeight:'600',
    fontSize:14,
    marginTop:6,
  }
});

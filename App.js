import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Component, useEffect, useState } from 'react';
// Global
import Colors from './Colors';
import tempData from './tempData';
// Component
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

export default function App() {
  // Điều kiện để mở giai diện thêm task (modal)
  const [ViewModal, setVietModal] = useState(false)
  // Biến List Todo
  const [listTodo, setListTodo] = useState([])

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://6385b0aabeaa6458266587ad.mockapi.io/api/ListTodo')
      .then((response) => response.json())
      .then((json) => setListTodo(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  // Biến user
  // const [user, setUser] = useState({})
  // Biến loading
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const firebase = new Fire((error, user) => {
  //     if (error) {
  //       return alter("Ohhhhh no, something went wrong");
  //     }
  //     const getlist = (lists) => {
  //       setUser({ lists, user }, () => {
  //         setLoading(false);
  //       });
  //     }
  //     firebase.getLists(getlist);
  //     setUser({ user });
  //   });
  //   return () => {
  //     firebase.detach();
  //   }
  // })



  // Render ra giao diện task lớn
  const renderList = (list) => {
    return <TodoList list={list} updateList={updateList} />
  }
  // Add todo 
  const addList = (list) => {
    (async () => {
      const rawResponse = await fetch('https://6385b0aabeaa6458266587ad.mockapi.io/api/ListTodo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...list, id: listTodo.length + 1, todos: [] })
      });
      fetch('https://6385b0aabeaa6458266587ad.mockapi.io/api/ListTodo')
        .then((response) => response.json())
        .then((json) => setListTodo(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    })();
  }
  // Update todo 
  const updateList = (list) => {
    const listOke = listTodo.map(item => {
      return item.id === list.id ? list : item
    })
    setListTodo(listOke)

  }

  function sortData() {
    let sortedArray = [];

    for (let index = listTodo.length - 1; index >= 0; index--) {
      const todo = listTodo[index];
      sortedArray.push(todo)
    }

    return sortedArray;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    )
  }

  return (

    <View style={styles.container}>
      <Modal animationType='slide' visible={ViewModal} onRequestClose={() => {
        setVietModal(false)
      }}>
        <AddListModal closeModal={() => {
          setVietModal(false)
        }} addList={addList} />
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo <Text style={{ fontWeight: "300", color: Colors.blue, }}>List</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity style={styles.addList} onPress={() => {
          setVietModal(true)
        }}>
          <AntDesign name='plus' size={16} color={Colors.blue} />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>
      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={sortData()}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
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
  divider: {
    backgroundColor: Colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: Colors.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
  },
  add: {
    color: Colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 6,
  }
});

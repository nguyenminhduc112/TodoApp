import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

// Component
import TodoModal from './TodoModal'

const TodoList = ({ list, updateList }) => {
  // Đếm lượn task hoàn thành trong kế hoạch đó
  const completedCount = list.todos.filter(todo => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;
  const [showModal, setShowModal] = useState(false)
  return (
    <View>
      <Modal animationType='slide' visible={showModal} onRequestClose={()=>{
        setShowModal(false)
      }}>
        <TodoModal list={list} closeModal={()=>{
          setShowModal(false)
        }} updateList={updateList} />
      </Modal>
      <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]} onPress={()=>{
        setShowModal(true)
      }}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subTitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subTitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default TodoList

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 40,
    fontWeight: '200',
    color: Colors.white,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  }
})
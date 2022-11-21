import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons';
import Colors from '../Colors';
const AddListModal = ({closeModal}) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={{position:'absolute',top:64,right:32}} onPress={closeModal}>
            <AntDesign name='close' size={24} color={Colors.black} />
        </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default AddListModal

const styles = StyleSheet.create({})
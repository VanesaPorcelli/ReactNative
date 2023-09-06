import { Button, Modal as NewModal, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Modal = ({ modalVisible, onHandleDelete, modalColors }) => {
    const {
        background,
        headerBackground,
        headerText,
        buttonBackground,
        buttonText,
    } = modalColors;

    return (
        <NewModal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={[styles.modalContainer, { backgroundColor: background }]}>
                <View style={[styles.modalContent, { backgroundColor: headerBackground }]}>
                    <View style={styles.modalMessage}>
                        <Text style={{ color: headerText }}>
                            Estás seguro de ELIMINAR este producto??
                        </Text>
                    </View>
                    <View style={[styles.modalButton, { backgroundColor: buttonBackground }]}>
                        <Button
                            title="Confirmar"
                            color={'#81C784'}
                            onPress={onHandleDelete}
                        />
                    </View>
                </View>
            </View>
        </NewModal>
    );
};

export default Modal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    modalTitle: {
        backgroundColor: '#ccc',
        fontSize: 18,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    modalMessage: {
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButton: {
        marginTop: 15,
        borderRadius: 10,
    },
});

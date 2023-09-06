import React, { useState } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import Modal from './components/Modal';
import CustomFlatList from './components/CustomFlatList';

export default function App() {
	const [textValue, setTextValue] = useState('');
	const [itemsList, setItemsList] = useState([]);
	const [itemSelected, setItemSelected] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const onHandleChangeItem = (text) => setTextValue(text);

	const addItem = () => {
		if (textValue === '') {
			return;
		}
		setItemsList((prevState) => [
			...prevState,
			{ id: Math.random().toString(), value: textValue },
		]);
		setTextValue('');
	};

	const renderListItem = ({ item, index }) => (
		<TouchableOpacity
			style={styles.itemContainer}
			onPress={() => onHandleModal(index)}
		>
			<Text style={styles.textItem}>{item?.value}</Text>
		</TouchableOpacity>
	);

	const onHandleDelete = () => {
		if (itemSelected !== null) {
			const updatedList = [...itemsList];
			updatedList.splice(itemSelected, 1);
			setItemsList(updatedList);
			setModalVisible(false);
		}
	};

	const onHandleModal = (index) => {
		setModalVisible(true);
		setItemSelected(index);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Lista de Productos</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Ingrese Producto"
					value={textValue}
					onChangeText={onHandleChangeItem}
				/>
				<Button title="Agregar" color="#7E57C2" onPress={addItem} />
			</View>
			<View style={styles.listContainer}>
				<CustomFlatList
					data={itemsList}
					renderItem={renderListItem}
					keyExtractor={(item) => item.id}
				/>
			</View>
			<Modal
				modalVisible={modalVisible}
				onHandleDelete={onHandleDelete}
				modalColors={{
					background: '#ECEFF1', // Gris claro
					headerBackground: '#512DA8', // Morado
					headerText: '#FFFFFF', // Texto de encabezado en blanco
					buttonBackground: '#7E57C2', // Azul claro
					buttonText: '#FFFFFF', // Texto de botón en blanco
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		paddingTop: 80,
		backgroundColor: '#ECEFF1', // Gris claro
	},
	title: {
		fontSize: 35,
		fontWeight: '500',
		marginBottom: 25,
		color: '#512DA8', // Morado
	},
	inputContainer: {
		borderRadius: 10,
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#FFFFFF', // Blanco
		justifyContent: 'space-between',
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	input: {
		flex: 1,
		width: 200,
		height: 50,
		fontSize: 17,
		paddingLeft: 12,
		color: '#37474F', // Gris azulado
	},
	listContainer: {
		marginTop: 25,
	},
	itemContainer: {
		height: 40,
		marginVertical: 10,
		marginHorizontal: 5,
		borderRadius: 10,
		justifyContent: 'center',
		backgroundColor: '#81C784', // Verde claro
		shadowColor: '#81C784',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
		elevation: 5,
	},
	textItem: {
		fontSize: 18,
		paddingLeft: 15,
		color: '#263238', // Gris oscuro
		fontWeight: '600',
		fontVariant: 'no-common-ligatures',
	},
});

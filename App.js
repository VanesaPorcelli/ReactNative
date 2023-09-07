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
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState('');

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
			{isEditing && itemSelected === index ? (
				<TextInput
					style={styles.editableText}
					value={editedText}
					onChangeText={(text) => setEditedText(text)}
				/>
			) : (
				<Text style={styles.textItem}>{item?.value}</Text>
			)}
			{isEditing && itemSelected === index ? (
				<TouchableOpacity
					style={styles.saveButton} // Aplicar estilo de botón de guardar
					onPress={() => onSaveEdit(index)}
				>
					<Text style={styles.saveButtonText}>Guardar</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={styles.editButton} // Aplicar estilo de botón de editar
					onPress={() => onEditItem(index)}
				>
					<Text style={styles.editButtonText}>Editar</Text>
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);

	const onEditItem = (index) => {
		setIsEditing(true);
		setEditedText(itemsList[index].value);
		setItemSelected(index);
	};

	const onSaveEdit = (index) => {
		if (editedText !== '') {
			const updatedList = [...itemsList];
			updatedList[index].value = editedText;
			setItemsList(updatedList);
			setIsEditing(false);
			setEditedText('');
		}
	};

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
					background: '#ECEFF1',
					headerBackground: '#512DA8',
					headerText: '#FFFFFF',
					buttonBackground: '#7E57C2',
					buttonText: '#FFFFFF',
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
		backgroundColor: '#ECEFF1',
	},
	title: {
		fontSize: 35,
		fontWeight: '500',
		marginBottom: 25,
		color: '#512DA8',
	},
	inputContainer: {
		borderRadius: 10,
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
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
		color: '#37474F',
	},
	listContainer: {
		marginTop: 25,
	},
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 40,
		marginVertical: 10,
		marginHorizontal: 5,
		borderRadius: 10,
		backgroundColor: '#81C784',
		shadowColor: '#81C784',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 3,
		elevation: 5,
		paddingHorizontal: 10,
	},
	textItem: {
		fontSize: 18,
		color: '#263238',
		fontWeight: '600',
		fontVariant: 'no-common-ligatures',
	},
	editableText: {
		flex: 1,
		fontSize: 18,
		color: '#512DA8', // Cambia el colorcuando estás editando
		fontWeight: '600',
		fontVariant: 'no-common-ligatures',
		padding: 0,
	},
	editButton: {
		backgroundColor: '#512DA8',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	editButtonText: {
		color: '#FFFFFF',
	},
	saveButton: {
		backgroundColor: '#7E57C2',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	saveButtonText: {
		color: '#FFFFFF',
	},
});

import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddContactScreen({ navigation, contacts, setContacts }) {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [error, setError] = useState('');

	function saveContact() {
		const trimmedName = name.trim();
		const trimmedPhone = phone.trim();

		if (!trimmedName || !trimmedPhone) {
			setError('Please enter both a name and a phone number.');
			return;
		}

		const newContact = { id: Date.now().toString(), name: trimmedName, phone: trimmedPhone };
		setContacts([...contacts, newContact]);
		setName('');
		setPhone('');
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Name</Text>
			<TextInput autoCapitalize="words" onChangeText={setName} placeholder="Ada Lovelace" style={styles.input} value={name} />
			<Text style={styles.label}>Phone</Text>
			<TextInput keyboardType="phone-pad" onChangeText={setPhone} placeholder="555-0100" style={styles.input} value={phone} />
			{error ? <Text style={styles.error}>{error}</Text> : null}
			<Button title="Save Contact" onPress={saveContact} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: '#ffffff' },
	label: { color: '#334155', fontSize: 15, fontWeight: '600', marginBottom: 6, marginTop: 12 },
	input: { borderColor: '#cbd5e1', borderRadius: 8, borderWidth: 1, color: '#0f172a', fontSize: 16, marginBottom: 8, padding: 12 },
	error: { color: '#dc2626', marginBottom: 12 },
});

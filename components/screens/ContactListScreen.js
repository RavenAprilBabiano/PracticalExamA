import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import ContactCard from '../ContactCard';

export default function ContactListScreen({ navigation, contacts, setContacts }) {
	const [fact, setFact] = useState('');

	useEffect(() => {
		let active = true;
		fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
			.then((response) => response.json())
			.then((data) => {
				if (active) setFact(data.text || 'Contacts are easier to find when they are saved.');
			})
			.catch(() => {
				if (active) setFact('Contacts are easier to find when they are saved.');
			});

		return () => {
			active = false;
		};
	}, []);

	const countLabel = `${contacts.length} contact${contacts.length === 1 ? '' : 's'} saved`;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Contacts</Text>
			<Text style={styles.count}>{countLabel}</Text>
			{fact ? <Text style={styles.fact}>{fact}</Text> : null}
			<Button title="Add Contact" onPress={() => navigation.navigate('AddContact')} />
			<FlatList
				contentContainerStyle={styles.list}
				data={contacts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ContactCard
						name={item.name}
						onDelete={() => setContacts((current) => current.filter((contact) => contact.id !== item.id))}
						phone={item.phone}
					/>
				)}
				ListEmptyComponent={<Text style={styles.empty}>No contacts saved yet.</Text>}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: '#ffffff' },
	title: { color: '#0f172a', fontSize: 28, fontWeight: '700' },
	count: { color: '#64748b', marginTop: 4, marginBottom: 16 },
	fact: { color: '#334155', fontStyle: 'italic', lineHeight: 20, marginBottom: 16 },
	list: { paddingTop: 20, flexGrow: 1 },
	empty: { color: '#64748b', paddingTop: 28, textAlign: 'center' },
});
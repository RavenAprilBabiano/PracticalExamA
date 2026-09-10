import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ContactCard({ name, phone, onDelete }) {
	return (
		<View style={styles.card}>
			<View style={styles.details}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.phone}>{phone}</Text>
			</View>
			<Pressable accessibilityLabel={`Delete ${name}`} onPress={onDelete} style={styles.deleteButton}>
				<Ionicons name="trash-outline" size={22} color="#dc2626" />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
		marginBottom: 12,
		borderRadius: 10,
		backgroundColor: '#f1f5f9',
	},
	details: { flex: 1 },
	deleteButton: { padding: 8 },
	name: {
		color: '#0f172a',
		fontSize: 17,
		fontWeight: '700',
	},
	phone: {
		color: '#475569',
		fontSize: 15,
		marginTop: 4,
	},
});
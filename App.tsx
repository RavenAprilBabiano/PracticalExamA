import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AddContactScreen from './components/screens/AddContactScreen';
import ContactListScreen from './components/screens/ContactListScreen';

const Stack = createNativeStackNavigator();
const CONTACTS_KEY = '@examapp/contacts';
const DEFAULT_CONTACTS = [
  { id: '1', name: 'Juan Dela Cruz', phone: '0917-000-0001' },
  { id: '2', name: 'Maria Santos', phone: '0917-000-0002' },
];

export default function App() {
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [loaded, setLoaded] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(CONTACTS_KEY)
      .then((storedContacts) => {
        if (storedContacts) setContacts(JSON.parse(storedContacts));
      })
      .catch(() => {})
      .finally(() => {
        hydrated.current = true;
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts)).catch(() => {});
  }, [contacts]);

  if (!loaded) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" options={{ title: 'My Contacts' }}>
          {(props) => <ContactListScreen {...props} contacts={contacts} setContacts={setContacts} />}
        </Stack.Screen>
        <Stack.Screen name="AddContact" options={{ title: 'Add Contact' }}>
          {(props) => <AddContactScreen {...props} contacts={contacts} setContacts={setContacts} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

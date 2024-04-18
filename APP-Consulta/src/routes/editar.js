import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VisualizarFilmesScreen from '../pages/Visualizar';
import Editar from '../pages/Editar';


const Stack = createNativeStackNavigator();

export default function EditarScrean() {
    return (
        <Stack.Navigator>
            
            <Stack.Screen
                name='Visualizar'
                component={VisualizarFilmesScreen}
                options={{
                    headerShown:false,
                
                  }}
            />

            <Stack.Screen
                name='Editar'
                component={Editar}
            />

        </Stack.Navigator>
    )
}
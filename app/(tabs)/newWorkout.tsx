import { StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import { workoutForm} from '../getAllScripts';


export default function NewWorkoutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="black" darkColor="rgba(255,255,255,0.1)" />

      {workoutForm()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    marginTop: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
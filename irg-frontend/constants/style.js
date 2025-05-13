import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5E9E2',
    padding: 20,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#5C5C5C',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05, 
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    marginRight: 8,
    fontSize: 16,
    color: '#5C5C5C',
    fontFamily: 'Inter_600SemiBold',
  },
  phoneInput: {
    flex: 1,
  },
  clusterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  clusterText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#000',
  },
  clusterButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  clusterButtonText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#5C5C5C',
    borderRadius: 6,
    backgroundColor: '#FFF',
    marginRight: 10,
  },

  checkboxText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#5C5C5C',
  },
  backButton: {
    marginTop: 10,
  },
  counterContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c1f2c',
    fontFamily: 'Playfair',
    marginBottom: 4,
  },
  
  counterNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#729c8c',
    fontFamily: 'Playfair',
  },
});

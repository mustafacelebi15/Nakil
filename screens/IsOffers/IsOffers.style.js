import { StyleSheet } from "react-native";


export default StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
    TextContainer:{
        marginTop:20,
        alignItems:'center',
    },
    title: {
        fontSize:15,
        color: "white",
        fontWeight:"500",
        marginBottom: 10,
    },
    imageBackground: {
      flex: 1,
      resizeMode: 'center',
      opacity:1,
    },
    contentContainer:{
        padding:16,
        marginTop:20,
    },
    input:{
        backgroundColor: "black",
        fontSize: 15,
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 6,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
advertisementItem: {
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonaccept: {
    backgroundColor: 'green', // Beyaz buton arka plan rengi
    padding: 8,
    borderRadius: 5,
  },
  buttonreject: {
    backgroundColor: 'red', // Beyaz buton arka plan rengi
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black', // Siyah buton metin rengi
    fontWeight: 'bold',
  },

})
import { StyleSheet } from "react-native";


export default StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      imageBackground: {
        flex: 1,
        resizeMode: 'center',
        opacity:1,
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
    contentContainer:{
        padding:16,
        marginTop:5,
    },
    input:{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        fontSize: 15,
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 6,
    },
    ButtonContainer: {
    flexDirection: "row",
    marginTop:20,
    marginBottom:5,
    justifyContent:'space-between'
},
advertisementItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },

})
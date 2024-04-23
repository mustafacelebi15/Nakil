import { StyleSheet } from "react-native";


export default StyleSheet.create ({
    imageBackground: {
        flex: 1,
        resizeMode: 'center',
      },
    container:{
        flex:1,
        backgroundColor: '#FC9483',
    },
    TextContainer:{
        marginTop:20,
        alignItems:'center',
    },
    title: {
        fontSize:40,
        fontWeight:"800",
        color: 'rgba(0, 0, 0, 0.5)',
    },
    contentContainer:{
        padding:16,
        marginTop:20,
    },
    input:{
        backgroundColor: "black",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        fontSize: 15,
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 6,
    },
    ButtonContainer: {
flexDirection: "row",
marginTop: 32,
justifyContent:'flex-end'
},

})
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#242D34'
    },
    bg: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    },
    map: {
        width: "80%",
        aspectRatio: 1 / 1,

    },
    turnText: {
        color: 'white',
        fontSize: 30,
        position: 'absolute',
        opacity: 0.6,
        marginBottom: 'auto',
        top: 50,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    cell: {
        width: 100,
        height: 100,
        flex: 1,
    },
    circle: {
        flex: 1,
        borderRadius: 50,
        margin: 10,
        borderWidth: 10,
        borderColor: "white"

    },
    crossLine: {
        position: 'absolute',
        left: 45,
        width: 10,
        height: '100%',
        backgroundColor: "white",
        borderRadius: 5,
        transform: [
            {
                rotate: "45deg",
            },
        ],
    },
    crossLineRev: {
        transform: [
            {
                rotate: "-45deg",
            },
        ],
    },
    cross: {
        flex: 1,
    },
    buttons: {
        position: "absolute", 
        bottom: 50,
        flexDirection: "row", 
    }, 
    eachButton: {
       paddingHorizontal: 15, 
       paddingVertical: 10, 
       borderWidth: 2, 
       margin: 10, 
       borderColor: "white", 
       borderRadius: 20,
       alignItems: "center"
    }, 
    eachButtonText: {
        color: "white", 
        fontSize: 15
    }, 
    eachButtonSelected: {
        borderColor: "grey",
        borderWidth: 2
    }

});

export default styles



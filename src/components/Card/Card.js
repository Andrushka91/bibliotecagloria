import React from 'react';
import { Dimensions, Image, Text, View } from "react-native";
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from "react-navigation";
import { COLORS } from '../../consts/colors';
import CardStyle from './CardStyle';


const Card = ({ book, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('BookDetails', { _id: book._id })}>
            <View style={CardStyle.card}>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: book.like ? 'rgba(245,42,42,0.2' : 'rgba(0,0,0,0,2)',
                    }}>
                        <Icon name="favorite" size={18} color={book.like ? COLORS.red : COLORS.dark} />
                    </View>
                </View>
                <View style={{ height: 100, alignItems: 'center' }}>
                    <Image
                        source={{ uri: 'data:image/jpg;base64,' + book.image.data }}
                        style={{ resizeMode: 'contain', flex: 1, width: 100 }} />
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
                    {book.title}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                    }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
                        €{book.price}
                    </Text>
                    <View
                        style={{
                            height: 32,
                            width: 32,
                            backgroundColor: COLORS.purple,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{ fontSize: 22, color: COLORS.white, fontWeight: 'bold' }}>
                            +
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default withNavigation(Card);
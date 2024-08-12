import React, { useState } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Day {
    date: string;
    dayOfWeek: string;
    isToday: boolean;
}

const Index: React.FC = () => {
    const [todayDate, setTodayDate] = useState(new Date());

    const getDayOfTheWeek = (startDate: Date): Day[] => {
        const Days: Day[] = []

        for(let i = 0; i < 7; i++){
            const date = new Date(startDate)
            date.setDate(startDate.getDate() +i)

            const dayOfWeek = date.toLocaleDateString('fr-FR',{ weekday: 'long' })
            const formattedDate = date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })

            Days.push({
                date: formattedDate,
                dayOfWeek: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
                isToday: i === 0 && todayDate.toDateString() === new Date().toDateString()
            })


        }
        return Days
    }

    const FirstWeek = getDayOfTheWeek(todayDate)

    const nextWeek = () => {
        const newStartDate = new Date(todayDate)
        newStartDate.setDate(todayDate.getDate() + 7)
        setTodayDate(newStartDate)
    }

    const previousWeek = () => {
        const newStartDate = new Date(todayDate)
        if (newStartDate > new Date()){
            newStartDate.setDate(todayDate.getDate() - 7)
            setTodayDate(newStartDate)
        }
    }

    const canPrevious = todayDate.toDateString() !== new Date().toDateString()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={canPrevious ? previousWeek : undefined} style={styles.arrowContainer} disabled={!canPrevious}>
                <AntDesign name="stepbackward" size={24} color="black" />
            </TouchableOpacity>
            <FlatList data={FirstWeek} showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.date} horizontal renderItem={({item}) => (
                <View style={[styles.dayContainer, item.isToday && styles.todayContainer]}>
                    <Text style={[styles.dayOfWeek, item.isToday && styles.todayText]}>{item.days}</Text>
                    <Text style={[styles.date, item.isToday && styles.todayText]}>{item.date}</Text>
                </View>
            )}/>
            <TouchableOpacity onPress={nextWeek} style={styles.arrowContainer}>
                <AntDesign name="stepforward" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    dayContainer: {
        alignItems: "center",
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    todayContainer: {
        backgroundColor: '#4caf50',
        borderRadius: 10,
    },
    dayOfWeek: {

    },
    arrowContainer: {
        padding:10,
    },
    todayText: {
        color: '#fff',
    },
    date: {
        fontSize:14,
        color: '#666',
    }
})
export default Index;

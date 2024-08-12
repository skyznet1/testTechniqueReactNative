import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Day {
    date: string;
    dayOfWeek: string;
    isToday: boolean;
    slots: Slot[];
}

interface Slot{
    start: Date;
    end: Date;
}

const Index: React.FC = () => {
    const [todayDate, setTodayDate] = useState(new Date());
    const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

    useEffect(() => {
        const fetchDays = () => {
            setDays(getDayOfTheWeek(todayDate))
        }

        fetchDays()
    }, [todayDate]);

    const genSlotsRandom = (): Slot[] => {
        const slots: Slot[] = []
        const randomNumberOfSlots = Math.floor(Math.random() * 10) + 1

        for (let i = 0; i < randomNumberOfSlots; i++){
            const start = new Date()
            start.setHours(Math.floor(Math.random() * 12) + 8)
            start.setMinutes(Math.floor(Math.random() * 4) * 15)

            const end =  new Date(start)
            end.setHours(start.getHours() + 1)

            slots.push({ start, end})
        }
        return slots
    }

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
                isToday: i === 0 && todayDate.toDateString() === new Date().toDateString(),
                slots: genSlotsRandom(),
            })


        }
        return Days
    }

    const [days, setDays] = useState<Day[]>(getDayOfTheWeek(todayDate));


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
            <FlatList data={days} showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.date} horizontal renderItem={({item}) => (
                <View style={[styles.dayContainer, item.isToday && styles.todayContainer]}>
                    <Text style={[styles.dayOfWeek, item.isToday && styles.todayText]}>{item.days}</Text>
                    <Text style={[styles.date, item.isToday && styles.todayText]}>{item.date}</Text>
                    <View style={styles.slotsContainer}>
                        {item.slots.map((slot, index) =>{
                            const slotId = `${item.date}-${index}`
                            return(
                                <TouchableOpacity  key={index} style={[styles.slot, hoveredSlot === slotId && styles.slotHover]} onPressIn={() => setHoveredSlot(slotId)} >
                                    <Text style={[styles.slotText, hoveredSlot === slotId && styles.slotTextHover]}>
                                        {slot.start.getHours()}:{slot.start.getMinutes() === 0 ? '00' : slot.start.getMinutes()} - {slot.end.getHours()}:{slot.end.getMinutes() === 0 ? '00' : slot.end.getMinutes()}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        )}
                    </View>
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
    },
    slotsContainer: {
        marginTop: 10,
    },
    slot: {
        backgroundColor: '#ddd',
        padding: 8,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
    slotText: {
        color: '#333',
        fontSize: 12,
    },
    slotHover: {
        backgroundColor: '#000',
    },
    slotTextHover: {
        color: '#fff',
    }

})
export default Index;

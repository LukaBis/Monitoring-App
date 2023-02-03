import React from "react";
import { useState, useRef, useEffect } from "react";
import { Typography } from '@mui/material';
import Form from './Form';
import './style/Homepage.css';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer} from 'recharts';
import getAllMessages from './requests/get/getAllMessages';
import type { Message } from './types/Message';
import MessagesTable from "./MessagesTable";

function Homepage() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [counter, setCounter] = useState<number | null>(null);
    const [counterNeg, setCounterNeg] = useState<number | null>(null);

    const ref = useRef<null | HTMLDivElement>(null);
    
    const data = [
        { name: 'Delivered', value: counter },
        { name: 'Rejected', value: counterNeg },
    ];

    type renderDataType = {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        percent: number;
        index: number;
        payload: {
            name: string;
            value: number;
        }
    }; 

    const COLORS = ["#2196f3", "#00C49F"];
    const RADIAN = Math.PI / 180;
    const style = {
        bottom: 10,
        left: 140,
        lineHeight: "2rem"
    };

    useEffect(() => {
        getAllMessages().then(messageList => {
            let deliveredCounter = 0;
            let notDeliveredCounter = 0;
            messageList.map((a) => (a.statusGroupName === "DELIVERED") ? deliveredCounter++ : notDeliveredCounter++ );
            setMessages(messageList);
            setCounter(deliveredCounter);
            setCounterNeg(notDeliveredCounter);
        });
    }, [])

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload}: renderDataType) => {

        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="center">
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        );
    };

    const handleClick = () => ref.current?.scrollIntoView({behavior: 'smooth'})

    return (
        <>
            <section className="jumbotron">
                <div className="heading-text">
                    <Typography variant='h3' sx={{ mb: 3, pr: 3 }}>
                        SMS messaging app with fast delivery
                    </Typography>
                    <Typography sx={{ pr: 3 }} color='text.secondary'>
                        Increase your engagement rates with the this SMS sending app.
                        Our SMS messaging app connects you to more potential and existing clients via marketing messages.
                        Send you customers messages with irresistible offers and new discounts.
                    </Typography>
                    <Button onClick={handleClick} variant="contained" size="large" sx={{ mt: 3 }}>
                        send message
                    </Button>
                </div>
                <img src="/message_sentl.png" />
            </section>
            <section className="form-section" ref={ref}>
                <Typography variant='h4' sx={{ mb: 3, pt: 5 }}>
                    Connect With Your Customers Using Our Web SMS Service
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    Reach more customers globally with fast and secure web app.
                </Typography>
                <Form />
            </section>

            <section className="chart-section">
                <div className="text">
                    <Typography variant='h4' sx={{ mb: 3 }}>
                        View our delivery success rates
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        You will have all the data about your messages delivery success. You will know if your message is:<br />
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        <CheckIcon color="primary" /> <b>Delivered</b> <br />
                        <CheckIcon color="primary" /> <b>Pending</b> <br />
                        <CheckIcon color="primary" /> <b>Rejected</b> <br />
                    </Typography>
                </div>
                <div className="chart">
                    <ResponsiveContainer width={"100%"} height={400}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend
                                iconSize={10}
                                width={100}
                                height={100}
                                layout="horizontal"
                                verticalAlign="bottom"
                                wrapperStyle={style}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <section className="latest-messages-section">
                <Typography variant='h4' sx={{ mb: 2 }}>
                    Some of the latest sent messages
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    This is an example of how your messages will be displayed. You will have
                    insight of their delivery status, contact, numbers and more
                </Typography>
                <MessagesTable numberOfMessages={4} />
            </section>
        </>
    )
}

export default Homepage;
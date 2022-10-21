import React, { useEffect, useRef, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/router'

import { connectMongo }  from '../utils/connect';
import TeamData from "../models/TeamData";
import Select from 'react-select';

const axios = require('axios').default;

export default function VoterForm(teams){
    const options = teams.allTeams;
    let teamList = [];

    for(let i = 0; i < options.length; i++){
        teamList.push({value:options[i]._id, label: options[i].name});
    }

    // set value for default selection
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [selectedValue2, setSelectedValue2] = useState(null);
    const [selectedLabel2, setSelectedLabel2] = useState(null);
    const [selectedValue3, setSelectedValue3] = useState(null);
    const [selectedLabel3, setSelectedLabel3] = useState(null);
    const [selectedValue4, setSelectedValue4] = useState(null);
    const [selectedLabel4, setSelectedLabel4] = useState(null);
    const [selectedValue5, setSelectedValue5] = useState(null);
    const [selectedLabel5, setSelectedLabel5] = useState(null);
    const [selectedValue6, setSelectedValue6] = useState(null);
    const [selectedLabel6, setSelectedLabel6] = useState(null);
    const [selectedValue7, setSelectedValue7] = useState(null);
    const [selectedLabel7, setSelectedLabel7] = useState(null);
    const [selectedValue8, setSelectedValue8] = useState(null);
    const [selectedLabel8, setSelectedLabel8] = useState(null);
    const [selectedValue9, setSelectedValue9] = useState(null);
    const [selectedLabel9, setSelectedLabel9] = useState(null);
    const [selectedValue10, setSelectedValue10] = useState(null);
    const [selectedLabel10, setSelectedLabel10] = useState(null);
    const [selectedValue11, setSelectedValue11] = useState(null);
    const [selectedLabel11, setSelectedLabel11] = useState(null);
    const [selectedValue12, setSelectedValue12] = useState(null);
    const [selectedLabel12, setSelectedLabel12] = useState(null);
    const [selectedValue13, setSelectedValue13] = useState(null);
    const [selectedLabel13, setSelectedLabel13] = useState(null);
    const [selectedValue14, setSelectedValue14] = useState(null);
    const [selectedLabel14, setSelectedLabel14] = useState(null);
    const [selectedValue15, setSelectedValue15] = useState(null);
    const [selectedLabel15, setSelectedLabel15] = useState(null);
    const [selectedValue16, setSelectedValue16] = useState(null);
    const [selectedLabel16, setSelectedLabel16] = useState(null);
    const [selectedValue17, setSelectedValue17] = useState(null);
    const [selectedLabel17, setSelectedLabel17] = useState(null);
    const [selectedValue18, setSelectedValue18] = useState(null);
    const [selectedLabel18, setSelectedLabel18] = useState(null);
    const [selectedValue19, setSelectedValue19] = useState(null);
    const [selectedLabel19, setSelectedLabel19] = useState(null);
    const [selectedValue20, setSelectedValue20] = useState(null);
    const [selectedLabel20, setSelectedLabel20] = useState(null);
    const [selectedValue21, setSelectedValue21] = useState(null);
    const [selectedLabel21, setSelectedLabel21] = useState(null);
    const [selectedValue22, setSelectedValue22] = useState(null);
    const [selectedLabel22, setSelectedLabel22] = useState(null);
    const [selectedValue23, setSelectedValue23] = useState(null);
    const [selectedLabel23, setSelectedLabel23] = useState(null);
    const [selectedValue24, setSelectedValue24] = useState(null);
    const [selectedLabel24, setSelectedLabel24] = useState(null);
    const [selectedValue25, setSelectedValue25] = useState(null);
    const [selectedLabel25, setSelectedLabel25] = useState(null);

    // handle onChange event of the dropdown
    const handleChange = e => {
        setSelectedValue(e.value);
        setSelectedLabel(e.label);
    }

    const handleChange2 = e => {
        setSelectedValue2(e.value);
        setSelectedLabel2(e.label);
    }

    const handleChange3 = e => {
        setSelectedValue3(e.value);
        setSelectedLabel3(e.label);
    }

    const handleChange4 = e => {
        setSelectedValue4(e.value);
        setSelectedLabel4(e.label);
    }

    const handleChange5 = e => {
        setSelectedValue5(e.value);
        setSelectedLabel5(e.label);
    }

    const handleChange6 = e => {
        setSelectedValue6(e.value);
        setSelectedLabel6(e.label);
    }

    const handleChange7 = e => {
        setSelectedValue7(e.value);
        setSelectedLabel7(e.label);
    }

    const handleChange8 = e => {
        setSelectedValue8(e.value);
        setSelectedLabel8(e.label);
    }

    const handleChange9 = e => {
        setSelectedValue9(e.value);
        setSelectedLabel9(e.label);
    }

    const handleChange10 = e => {
        setSelectedValue10(e.value);
        setSelectedLabel10(e.label);
    }

    const handleChange11 = e => {
        setSelectedValue11(e.value);
        setSelectedLabel11(e.label);
    }

    const handleChange12 = e => {
        setSelectedValue12(e.value);
        setSelectedLabel12(e.label);
    }

    const handleChange13 = e => {
        setSelectedValue13(e.value);
        setSelectedLabel13(e.label);
    }

    const handleChange14 = e => {
        setSelectedValue14(e.value);
        setSelectedLabel14(e.label);
    }

    const handleChange15 = e => {
        setSelectedValue15(e.value);
        setSelectedLabel15(e.label);
    }

    const handleChange16 = e => {
        setSelectedValue16(e.value);
        setSelectedLabel16(e.label);
    }

    const handleChange17 = e => {
        setSelectedValue17(e.value);
        setSelectedLabel17(e.label);
    }

    const handleChange18 = e => {
        setSelectedValue18(e.value);
        setSelectedLabel18(e.label);
    }

    const handleChange19 = e => {
        setSelectedValue19(e.value);
        setSelectedLabel19(e.label);
    }

    const handleChange20 = e => {
        setSelectedValue20(e.value);
        setSelectedLabel20(e.label);
    }

    const handleChange21 = e => {
        setSelectedValue21(e.value);
        setSelectedLabel21(e.label);
    }

    const handleChange22 = e => {
        setSelectedValue22(e.value);
        setSelectedLabel22(e.label);
    }

    const handleChange23 = e => {
        setSelectedValue23(e.value);
        setSelectedLabel23(e.label);
    }

    const handleChange24 = e => {
        setSelectedValue24(e.value);
        setSelectedLabel24(e.label);
    }

    const handleChange25 = e => {
        setSelectedValue25(e.value);
        setSelectedLabel25(e.label);
    }

    return(
        <div>
            <h1>Vote in the poll</h1>
            <h1>'s ballot</h1>
            <Form>
                <Row>
                    <Col>
                        1
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue)}
                        label={teamList.filter(obj => obj.label === selectedLabel)}
                        options={teamList}
                        onChange={handleChange}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        2
                    </Col>
                    <Col>
                    <Select instanceId="short-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue2)}
                        label={teamList.filter(obj => obj.label === selectedLabel2)}
                        options={teamList}
                        onChange={handleChange2}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        3
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue3)}
                        label={teamList.filter(obj => obj.label === selectedLabel3)}
                        options={teamList}
                        onChange={handleChange3}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        4
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue4)}
                        label={teamList.filter(obj => obj.label === selectedLabel4)}
                        options={teamList}
                        onChange={handleChange4}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        5
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue5)}
                        label={teamList.filter(obj => obj.label === selectedLabel5)}
                        options={teamList}
                        onChange={handleChange5}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        6
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue6)}
                        label={teamList.filter(obj => obj.label === selectedLabel6)}
                        options={teamList}
                        onChange={handleChange6}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        7
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue7)}
                        label={teamList.filter(obj => obj.label === selectedLabel7)}
                        options={teamList}
                        onChange={handleChange7}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        8
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue8)}
                        label={teamList.filter(obj => obj.label === selectedLabel8)}
                        options={teamList}
                        onChange={handleChange8}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        9
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue9)}
                        label={teamList.filter(obj => obj.label === selectedLabel9)}
                        options={teamList}
                        onChange={handleChange9}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        10
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue10)}
                        label={teamList.filter(obj => obj.label === selectedLabel10)}
                        options={teamList}
                        onChange={handleChange10}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        11
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue11)}
                        label={teamList.filter(obj => obj.label === selectedLabel11)}
                        options={teamList}
                        onChange={handleChange11}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        12
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue12)}
                        label={teamList.filter(obj => obj.label === selectedLabel12)}
                        options={teamList}
                        onChange={handleChange12}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        13
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue13)}
                        label={teamList.filter(obj => obj.label === selectedLabel13)}
                        options={teamList}
                        onChange={handleChange13}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        14
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue14)}
                        label={teamList.filter(obj => obj.label === selectedLabel14)}
                        options={teamList}
                        onChange={handleChange14}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        15
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue15)}
                        label={teamList.filter(obj => obj.label === selectedLabel15)}
                        options={teamList}
                        onChange={handleChange15}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        16
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue16)}
                        label={teamList.filter(obj => obj.label === selectedLabel16)}
                        options={teamList}
                        onChange={handleChange16}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        17
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue17)}
                        label={teamList.filter(obj => obj.label === selectedLabel17)}
                        options={teamList}
                        onChange={handleChange17}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        18
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue18)}
                        label={teamList.filter(obj => obj.label === selectedLabel18)}
                        options={teamList}
                        onChange={handleChange18}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        19
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue19)}
                        label={teamList.filter(obj => obj.label === selectedLabel19)}
                        options={teamList}
                        onChange={handleChange19}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        20
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue20)}
                        label={teamList.filter(obj => obj.label === selectedLabel20)}
                        options={teamList}
                        onChange={handleChange20}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        21
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue21)}
                        label={teamList.filter(obj => obj.label === selectedLabel21)}
                        options={teamList}
                        onChange={handleChange21}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        22
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue22)}
                        label={teamList.filter(obj => obj.label === selectedLabel22)}
                        options={teamList}
                        onChange={handleChange22}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        23
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue23)}
                        label={teamList.filter(obj => obj.label === selectedLabel23)}
                        options={teamList}
                        onChange={handleChange23}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        24
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue24)}
                        label={teamList.filter(obj => obj.label === selectedLabel24)}
                        options={teamList}
                        onChange={handleChange24}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
                <Row>
                    <Col>
                        25
                    </Col>
                    <Col>
                    <Select instanceId="long-value-select" 
                        value={teamList.filter(obj => obj.value === selectedValue25)}
                        label={teamList.filter(obj => obj.label === selectedLabel25)}
                        options={teamList}
                        onChange={handleChange25}>
                    </Select>
                    </Col>
                    <Col>
                        <Form.Label>Reasoning</Form.Label>
                        <Form.Control as="textarea" rows={3} />           
                    </Col>
                </Row>
            </Form>            

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </div>
    );
}


export const getServerSideProps = async () => {
    try{
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');
        
        console.log('FETCHING TEAMS');
        const teams = await TeamData.find({});
        const allTeams = JSON.parse(JSON.stringify(teams));
        console.log('FETCHED TEAMS');

        return{
            props: {allTeams}
        }



    }
    catch(error){
        console.log(error);
        return{
            notFound: true
        }
    }
}

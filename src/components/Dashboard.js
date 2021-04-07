import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import IndividualDashboard from './IndividualDashboard';
import OverallDashboard from './OverallDashboard';

const Dashboard = () => {
    return (
        <div>
            <Tabs defaultActiveKey="overall" id="uncontrolled-tab-example">
                <Tab eventKey="overall" title="Overall Dashboard">
                    <OverallDashboard />
                </Tab>
                <Tab eventKey="individual" title="Individual">
                    <IndividualDashboard />
                </Tab>
            </Tabs>
        </div>
    )
}

export default Dashboard

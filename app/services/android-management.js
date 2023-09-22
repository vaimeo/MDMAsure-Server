'use strict';
//This file is used to intract with android managemt API

const {google} = require('googleapis');
const config = require('../config');
const androidmanagement = google.androidmanagement('v1');
const enterprices = androidmanagement.enterprises;

// const plist = async function getPoliciesList() {}

module.exports = function () {

    this.updatePubSub = async function (body)
    { 
            const auth = new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/androidmanagement'],
            });

            const authClient = await auth.getClient();
            google.options({auth: authClient});
            
            // Get the list of available policies
            const res = await androidmanagement.enterprises.patch(body);
            console.log('requestFinalBody=',body);
            return res.data;

    }

    this.getEnterPriceInfo = async function (body)
    { 
            const auth = new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/androidmanagement'],
            });

            const authClient = await auth.getClient();
            google.options({auth: authClient});
            
            // Get the list of available policies
            const res = await androidmanagement.enterprises.get(body);
            console.log('requestFinalBody=',body);
            return res.data;

    }


    this.getEnterPriceSignupUrl = async function (body)
    { 
            const auth = new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/androidmanagement'],
            });

            const authClient = await auth.getClient();
            google.options({auth: authClient});
            
            const res = await androidmanagement.signupUrls.create(body);
            return res.data;

    }


    

    this.creteEnterprise = async function (body)
    { 
            const auth = new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/androidmanagement'],
            });

            const authClient = await auth.getClient();
            google.options({auth: authClient});
            
            const res = await androidmanagement.enterprises.create(body);
            return res.data;

    }



    this.enterprisesDelete = async function (body)
    { 
            const auth = new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/androidmanagement'],
            });

            const authClient = await auth.getClient();
            google.options({auth: authClient});
            
            const res = await androidmanagement.enterprises.delete(body);
            return res.data;

    }
    
    

    this.getEnterpriseList =  async function () {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/androidmanagement'],
        });
        const authClient = await auth.getClient();
        google.options({auth: authClient});
        
        // Get the list of available policies
        const res = await androidmanagement.enterprises.list({
                pageSize: '100',
                projectId: config.projectId
            });
        //console.log(res.data);
        return res.data;
    }



    this.removeEnterprise =  async function (body) {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/androidmanagement'],
        });
        const authClient = await auth.getClient();
        google.options({auth: authClient});
        
        // Get the list of available policies
        const res = await androidmanagement.enterprises.delete(body);
        //console.log(res.data);
        return res.data;
    }



    this.updatePolicy = async function (body)
    { 
            const auth = new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/androidmanagement'],
            });

            const authClient = await auth.getClient();
            google.options({auth: authClient});
            
            // Get the list of available policies
            const res = await androidmanagement.enterprises.policies.patch(body);
            console.log('requestFinalBody=',body);
            return res.data;

    }



    this.removePolicy =  async function (body) {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/androidmanagement'],
        });
        const authClient = await auth.getClient();
        google.options({auth: authClient});
        
        // Get the list of available policies
        const res = await enterprices.policies.delete(body);
        //console.log(res.data);
        return res.data;
    }


    

    this.getPolicyList =  async function () {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/androidmanagement'],
        });
        const authClient = await auth.getClient();
        google.options({auth: authClient});
        
        // Get the list of available policies
        const res = await enterprices.policies.list({
                pageSize: '100',
                parent: 'enterprises/LC019rjnor',
            });
        //console.log(res.data);
        return res.data;
    }

    this.getPolicyDetails =  async function (policyName) {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/androidmanagement'],
        });
        const authClient = await auth.getClient();
        google.options({auth: authClient});
        
        // Get the list of available policies
        const res = await enterprices.policies.get({
                name: policyName,
            });
        //console.log(res.data);
        return res.data;
    }

    this.getParent = function(string)
    {
        const words = string.split('/');
        return  (words[0]+'/'+words[1]);
    }

    
    this.getTokenUrl =  async function (policyName) {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/androidmanagement'],
        });
        const authClient = await auth.getClient();
        google.options({auth: authClient});
        
        const pn = policyName.split('/');

        console.log({
            parent: this.getParent(policyName),
            requestBody:{
                "policyName": pn[3]
            }
            });
        
        // Get the list of available policies
        const res = await enterprices.enrollmentTokens.create({
            parent: this.getParent(policyName),
            requestBody:{
                "policyName": pn[3]
            }
            });
        console.log(res.data);

        return 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=' + encodeURIComponent(res.data['qrCode'])

    }





    this.updateDevice = async function (body)
    { 
            const auth = new google.auth.GoogleAuth({
                scopes: ['https://www.googleapis.com/auth/androidmanagement'],
            });

            const authClient = await auth.getClient();
            google.options({auth: authClient});
            
            // Get the list of available policies
            const res = await androidmanagement.enterprises.devices.patch(body);
            console.log('requestFinalBody=',body);
            return res.data;

    }



    this.removeDevice =  async function (body) {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/androidmanagement'],
        });
        const authClient = await auth.getClient();
        google.options({auth: authClient});
        
        // Get the list of available policies
        const res = await enterprices.devices.delete(body);
        //console.log(res.data);
        return res.data;
    }



    this.getDeviceList =  async function () {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/androidmanagement'],
        });
        const authClient = await auth.getClient();
        google.options({auth: authClient});
        
        // Get the list of available policies
        const res = await enterprices.devices.list({
                pageSize: '10',
                parent: 'enterprises/LC019rjnor',
            });
        //console.log(res.data);
        return res.data;
    }

    this.getDeviceDetails =  async function (deviceId) {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/androidmanagement'],
        });
        const authClient = await auth.getClient();
        google.options({auth: authClient});
        
        // Get the list of available policies
        const res = await enterprices.devices.get({
                name: deviceId,
            });
        //console.log(res.data);
        return res.data;
    }
    


}
import Cookies from "js-cookie";
import axios from 'axios'; // Import Axios


export const post_job = async (formData) => {

    try {
        const res = await axios.post(`http://localhost:8000/jobs/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in post job (service) => ', error);
    }
}


// get job jobs
export const get_job = async () => {
    try {
        const res = await fetch(`http://localhost:8000/jobs/get`, {
            method: 'GET',
            headers : {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting job (service) => ', error);
    }
}

// get specified job jobs
export const get_specified_job = async (id) => {
    try {
        const res = await fetch(`http://localhost:8000/jobs/get/:id=${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting  specified job (service) => ', error);
    }
}



// apply  job jobs

export const apply_job = async (formData) => {
    try {
        const res = await fetch(`http://localhost:8000/jobs/job/applyJob`, {
            method: 'POST',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`},
            body: formData,
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error in apply job (service) => ', error);
    }
}


// get my all applied job jobs
 
export const get_my_applied_job = async (id) => {
    try {
        const res = await fetch(`http://localhost:8000/jobs/job/getAppliedJobs?id=${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting  getting my all job (service) => ', error);
    }
}


// get my all posted job jobs 

export const get_my_posted_job = async (id) => {
    try {
        const res = await fetch(`http://localhost:8000/jobs/job/getPostedJobs?id=${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in   getting my all job (service) => ', error);
    }
}


// get my all application of specified jobs jobs

export const get_all_applications = async (id) => {
    try {
        const res = await fetch(`http://localhost:8000/jobs/job/getAllApplicationsOfSpecifiedJob?id=${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in   getting my all application of specified jobs (service) => ', error);
    }
}


// change application status jobs

export const change_application_status = async (formData) => {
    try {
        const res = await fetch(`http://localhost:8000/jobs/job/responseOfApplication`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in   getting my all application of specified jobs (service) => ', error);
    }
}



export const get_application_details = async (id) => {
    try {
        const res = await fetch(`http://localhost:8000/jobs/job/getApplicationDetail?id=${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in   getting my all application of specified jobs (service) => ', error);
    }
}
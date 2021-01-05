import axios from 'axios';

class Api {

    static baseAxios = null;

    constructor(baseUrl) {

        this.baseAxios = axios.create({
            baseUrl
        });
    };

    async play(postObj) {
        var response = null;

        try {
            var url = postObj.webServiceUrl + "/timer/";
            console.log("postTime url = " + url);
            response = await
                axios.post(url, {
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    params: {
                        hours: postObj.hours,
                        minutes: postObj.minutes,
                        seconds: postObj.seconds,
                    }
                }, { timeout: 6000 });
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    async pause(postObj) {
        var response = null;

        try {
            var url = postObj.webServiceUrl + "/pause/";
            console.log("postTime url = " + url);
            response = await
                axios.post(url, {
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }, { timeout: 3000 });
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    async resume(postObj) {
        var response = null;

        try {
            var url = postObj.webServiceUrl + "/resume/";
            console.log("postTime url = " + url);

            response = await
                axios.post(url, {
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }, { timeout: 3000 });
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    async stop(postObj) {
        var response = null;

        try {
            var url = postObj.webServiceUrl + "/setTime/";
            console.log("postTime url = " + url);
            response = await
                axios.post(url, {
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }, { timeout: 6000 });
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    async powerCycleClock(postObj) {
        try {
            var url = postObj.webServiceUrl + "/powerCycle/"
            console.log("postTime url = " + url)
            axios.post(url, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }, { timeout: 3000 });
        } catch (error) {
            console.log(error);
        }
    }

    // Create another method for Master if changes are too extensive or if new api call is needed
    async postTime(postObj) {
        /*
          return this.baseAxios.get(`/go`,{
              params: {
                  target: postObj.ip,
                  timer: `${postObj.hours}:${postObj.minutes}:${postObj.seconds}`,
                  fulltime : postObj.timerTime,
                  id : postObj.id,
                  stop : false,
                  pause : false
              }
          });
          */
        var response = null;

        try {
            var url = postObj.webServiceUrl + "/dim/";
            console.log("postTime url = " + url);
            response = await
                axios.post(url, {
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    level: postObj.level
                }, { timeout: 6000 });
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    postPower(postObj) {
        return this.baseAxios.get(`/powerBtn`, {
            on: postObj.power
        });
    }
    postBright(postObj) {
        // return this.baseAxios.post(`/dim`, {
        //     bright: postObj.bright
        // });
        try {
            // TODO - dynamically build the web service url based on the postObj.ip
            var url = postObj.webServiceUrl + "/dim/";
            console.log("postTime url = " + url);
            console.log(postObj.level)
            axios.post(url, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                level: postObj.level
                
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    postSync(postObj) {
        return this.baseAxios.get(`/sync`, {
            sync: postObj.sync
        });
    }
    async postMil(postObj) {
        // return this.baseAxios.get(`/milTime`, {
        //     mil: postObj.mil
        // });
        var response = null;
        var url = postObj.webServiceUrl + "/militaryTime/";
            console.log("postTime url = " + url);
        try{
            response = await axios.post(url, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        } catch(error){
            console.log(error)
        }
        return response
    }
    
};

export default new Api();

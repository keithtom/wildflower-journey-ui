import { sample } from 'lodash'

// allows for fake errors and timeout delays.  basically for testing.  in produciton, just do real call.
 module.exports.useApi = () => {
   const handleInBackend = async (operation, data) => {
     console.log(`[handle in backend] ${operation}: `, data)
     return sleep(() => {
       if (sample([true, false])) {
         // call actualy api function, which makes call and stores results somehwere?
         console.log(`[handle in backend] succeeded!`)
       } else {
         throw new Error(`api request failed with status 500`)
       }
     }, 1000)
   }

   function timeout(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
   }
   async function sleep(fn, time) {
     await timeout(time);
     return fn();
   }

   return {
     // edit user, edit school
     // search
     editProfile: async ({ userId, data }) => {
       return handleInBackend('editing profile', { userId, data })
     }
   }
 }

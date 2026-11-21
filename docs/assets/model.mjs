export const VERSION='U-362.1.0.0';
export const PROVIDERS=Object.freeze(['topclick','belkins','callbox','cience','leadium','martal','pearl-lemon','salesar','saleshive','salesroads']);
export const DELIVERABLES=Object.freeze(['contact_list','qualified_reply','booked_meeting']);
export const FIELDS=Object.freeze(['qualificationRule','reviewOwnerRole','evidenceRef','exclusion']);
export function inspectRequirements(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('A requirements object is required.');
 if(!PROVIDERS.includes(input.provider))throw new Error('Choose a listed provider.');
 if(!DELIVERABLES.includes(input.deliverable))throw new Error('Choose a listed deliverable.');
 const fields={};const gaps=[];
 for(const key of FIELDS){const v=input[key]??'';if(typeof v!=='string'||v.length>240||/[\u0000-\u0008\u000b-\u001f\u007f]/.test(v))throw new Error('Use plain text of up to 240 characters per field.');fields[key]=v.trim();if(!fields[key])gaps.push(key);}
 return {version:VERSION,provider:input.provider,deliverable:input.deliverable,...fields,fieldState:gaps.length?'FIELD_GAPS':'FIELDS_PRESENT_NOT_VERIFIED',gaps,sourceSupportVerified:false,supplierApproved:false,outreachAuthorized:false,crmUpdated:false};
}
export const canSwitchProvider=dirty=>!dirty;
export const toJSON=result=>JSON.stringify(result,null,2)+'\n';

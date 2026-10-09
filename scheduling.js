// Preview-only schedule source. Production must replace this with authoritative calendars.
export const electricians = [
  { id: 'e1', skills: ['other','ev','lighting','repairs','panels','projects','commercial'], hours: [540,1020], busy: [{date:'2026-10-12',start:540,end:780},{date:'2026-10-13',start:780,end:1020}] },
  { id: 'e2', skills: ['other','ev','lighting','repairs','projects'], hours: [540,1020], busy: [{date:'2026-10-12',start:540,end:1020},{date:'2026-10-14',start:540,end:660}] },
  { id: 'e3', skills: ['other','lighting','repairs','panels','commercial'], hours: [600,960], busy: [{date:'2026-10-13',start:0,end:1440},{date:'2026-10-15',start:600,end:840}] }
];
export const duration = {ev:90,lighting:120,repairs:60,panels:90,projects:120,commercial:120,other:60};
export function getSlots(service, {workers=electricians, startDate='2026-10-12', days=12, buffer=30}={}) {
  const minutes=duration[service]; if (!minutes) return [];
  const output=[];
  for(let day=0;day<days;day++){
    const date=new Date(startDate+'T12:00:00Z'); date.setUTCDate(date.getUTCDate()+day);
    if([0,6].includes(date.getUTCDay())) continue;
    const iso=date.toISOString().slice(0,10);
    for(const start of [540,660,780,900]){
      const end=start+minutes;
      const eligible=workers.filter(worker=>worker.skills.includes(service)&&start>=worker.hours[0]&&end<=worker.hours[1]&&!worker.busy.some(b=>b.date===iso&&start<b.end+buffer&&end+buffer>b.start));
      if(eligible.length) output.push({id:iso+'-'+start,date:iso,start,end,eligible:eligible.map(w=>w.id)});
    }
  }
  return output.sort((a,b)=>a.date.localeCompare(b.date)||a.start-b.start);
}
export function timeLabel(minutes){const h=Math.floor(minutes/60);const m=minutes%60;return `${h%12||12}${m?':'+String(m).padStart(2,'0'):''} ${h<12?'am':'pm'}`;}
export function dateLabel(iso){return new Intl.DateTimeFormat('en-US',{weekday:'long',month:'short',day:'numeric',timeZone:'America/Los_Angeles'}).format(new Date(iso+'T12:00:00Z'));}
export function slotLabel(slot){return `${timeLabel(slot.start)}–${timeLabel(slot.end)}`;}

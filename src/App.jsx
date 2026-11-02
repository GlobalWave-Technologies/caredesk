import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Baby,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileSpreadsheet,
  FileText,
  Globe,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  Trash2,
  UsersRound,
  X,
} from 'lucide-react'
import './App.css'

const appointments = [
  { time: '08:30 AM', name: 'Ama Serwaa', initials: 'AS', detail: 'General check-up', doctor: 'Dr. K. Mensah', color: 'mint', status: 'Checked in' },
  { time: '09:15 AM', name: 'Kwame Asante', initials: 'KA', detail: 'Follow-up visit', doctor: 'Dr. E. Boateng', color: 'gold', status: 'In consultation' },
  { time: '10:00 AM', name: 'Abena Owusu', initials: 'AO', detail: 'Antenatal · 28 weeks', doctor: 'Dr. N. Addo', color: 'rose', status: 'Upcoming' },
  { time: '10:45 AM', name: 'Yaw Frimpong', initials: 'YF', detail: 'Cardiology review', doctor: 'Dr. A. Osei', color: 'blue', status: 'Upcoming' },
]

const patients = [
  { name: 'Ama Serwaa', initials: 'AS', id: 'CD-24810', gender: 'Female', age: '32 yrs', department: 'General', visit: 'Today, 08:30 AM', status: 'Checked in', tone: 'green' },
  { name: 'Kwame Asante', initials: 'KA', id: 'CD-24798', gender: 'Male', age: '45 yrs', department: 'Cardiology', visit: 'Today, 09:15 AM', status: 'In consultation', tone: 'blue' },
  { name: 'Abena Owusu', initials: 'AO', id: 'CD-24771', gender: 'Female', age: '28 yrs', department: 'Maternity', visit: 'Today, 10:00 AM', status: 'Upcoming', tone: 'gold' },
  { name: 'Yaw Frimpong', initials: 'YF', id: 'CD-24763', gender: 'Male', age: '51 yrs', department: 'Cardiology', visit: 'Today, 10:45 AM', status: 'Upcoming', tone: 'purple' },
  { name: 'Efua Darko', initials: 'ED', id: 'CD-24724', gender: 'Female', age: '36 yrs', department: 'Maternity', visit: 'Today, 11:30 AM', status: 'Upcoming', tone: 'rose' },
  { name: 'Esi Quaye', initials: 'EQ', id: 'CD-24702', gender: 'Female', age: '41 yrs', department: 'Public health', visit: 'Today, 12:15 PM', status: 'Upcoming', tone: 'green' },
]

const familyPlanningItems = [
  { id: 'male-condom', name: 'Male condom (latex)' },
  { id: 'female-condom', name: 'Female condom' },
  { id: 'jadelle', name: 'Levonorgestrel 75 mg, 2-rod (Jadelle)' },
  { id: 'implanon', name: 'Etonogestrel 68 mg, 1-rod (Implanon NXT)' },
  { id: 'sino-implant', name: 'Sino-implant (Zarin)' },
  { id: 'cycle-beads', name: 'Natural method: cycle beads' },
  { id: 'dmpa', name: 'DMPA 150 mg (Depo Provera)' },
  { id: 'dmpa-sc', name: 'DMPA-SC (Sayana Press)' },
  { id: 'cic', name: 'CIC (Norinyl)' },
  { id: 'copper-iud', name: 'Copper TCu380A IUD' },
]

const diseaseConditions = [
  ...['Acute flaccid paralysis (polio)', 'Meningitis', 'Neonatal tetanus', 'Pertussis (whooping cough)', 'Diphtheria', 'Measles', 'Yellow fever', 'Tetanus', 'Tuberculosis'].map((name) => ({ id: `immunizable-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, section: 'Communicable · immunizable', name })),
  ...['Uncomplicated malaria suspected', 'Uncomplicated malaria tested', 'Uncomplicated malaria tested positive', 'Uncomplicated malaria not tested but treated', 'Uncomplicated malaria tested negative but treated', 'Malaria in pregnancy suspected', 'Malaria in pregnancy tested', 'Malaria in pregnancy tested positive', 'Malaria in pregnancy not tested but treated', 'Malaria in pregnancy tested negative but treated', 'Severe malaria (lab confirmed)', 'Severe malaria (non-lab confirmed)', 'Typhoid fever', 'Suspected cholera', 'Diarrhoeal diseases', 'Viral hepatitis', 'Schistosomiasis (bilharzia)', 'Suspected guinea worm', 'Onchocerciasis', 'Buruli ulcer', 'Leprosy', 'HIV/AIDS-related conditions', 'Mumps', 'Intestinal worms', 'Chicken pox', 'Upper respiratory tract infections', 'Pneumonia', 'Septicaemia'].map((name) => ({ id: `communicable-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, section: 'Communicable · non-immunizable', name })),
  ...['Malnutrition', 'Obesity', 'Anaemia', 'Other nutritional diseases', 'Hypertension', 'Cardiac diseases', 'Stroke', 'Diabetes mellitus', 'Rheumatism / joint pains / arthritis', 'Sickle cell disease', 'Asthma', 'Chronic obstructive pulmonary disease (COPD)', 'Breast cancer', 'Cervical cancer', 'Lymphoma', 'Prostate cancer', 'Hepatocellular carcinoma', 'Other cancers'].map((name) => ({ id: `non-communicable-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, section: 'Non-communicable diseases', name })),
  ...['Schizophrenia', 'Acute psychotic disorder', 'Mono-symptom delusion', 'Depression', 'Substance abuse', 'Epilepsy', 'Autism', 'Intellectual disability', 'Attention deficit hyperactivity disorder', 'Conversion disorders', 'Post-traumatic stress syndrome', 'Generalized anxiety', 'Other anxiety disorders', 'Neurosis'].map((name) => ({ id: `mental-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, section: 'Mental health', name })),
  ...['Acute eye infection', 'Cataract', 'Trachoma', 'Otitis media', 'Other acute ear infection', 'Dental caries', 'Dental swellings', 'Oral and maxillofacial trauma', 'Periodontal diseases', 'Cerebral palsy', 'Liver diseases', 'Acute urinary tract infection', 'Skin diseases', 'Ulcer', 'Kidney-related diseases', 'Other oral conditions'].map((name) => ({ id: `specialized-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, section: 'Specialized conditions', name })),
  ...['Gynaecological conditions', 'Pregnancy-related complications', 'Anaemia in pregnancy', 'Gonorrhoea', 'Genital ulcer', 'Vaginal discharge', 'Urethral discharge', 'Male reproductive system diseases', 'Female reproductive system diseases'].map((name) => ({ id: `reproductive-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, section: 'Reproductive health', name })),
  ...['Transport injuries / road traffic accidents', 'Home injuries', 'Occupational / industrial injuries', 'Burns', 'Poisoning', 'Dog bite', 'Human bites', 'Snake bite', 'Sexual abuse', 'Domestic violence', 'Pyrexia of unknown origin', 'Brought in dead', 'Other animal bites', 'All other diseases', 'Re-attendances', 'Referrals'].map((name) => ({ id: `other-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, section: 'Injuries, others and referrals', name })),
]

const diseaseAgeGroups = ['<28 days', '1–11 months', '1–4 years', '5–9 years', '10–14 years', '15–17 years', '18–19 years', '20–34 years', '35–49 years']
const outpatientAgeGroups = ['0–28 days', '1–11 months', '1–4 years', '5–9 years', '10–14 years', '15–17 years', '18–19 years', '20–34 years', '35–49 years', '50–59 years', '60–69 years', '70 years and above']
const outpatientVisitTypes = [
  { id: 'insuredNew', name: 'Insured · new' },
  { id: 'insuredOld', name: 'Insured · old' },
  { id: 'uninsuredNew', name: 'Non-insured · new' },
  { id: 'uninsuredOld', name: 'Non-insured · old' },
]
const midwifeSections = [
  { id: 'service-availability', title: 'Service availability', fields: ['EMONC service', 'Blood transfusion service', 'PMTCT service', 'Early infant diagnosis (EID)', 'Conducted deliveries', 'Baby-friendly services'] },
  { id: 'antenatal', title: 'Antenatal care', fields: ['Registrants', 'Attendances', 'Making fourth visit', 'Making eighth visit', 'TD2+ doses', 'Mothers below 150 cm', 'Pregnant women seen at 36 weeks', 'IPT dose 1', 'IPT dose 2', 'IPT dose 3', 'IPT dose 4', 'IPT dose 5', 'Syphilis tests performed', 'Syphilis positive', 'Haemoglobin checked at registration', 'Haemoglobin below 11 g/dl at registration', 'Haemoglobin below 7 g/dl at registration', 'Haemoglobin checked at 36 weeks', 'Haemoglobin below 11 g/dl at 36 weeks', 'Haemoglobin below 7 g/dl at 36 weeks', 'Known HIV-positive before pregnancy', 'On ARV before pregnancy', 'Newly started on treatment', 'Initially tested', 'Positive at initial testing', 'Negative mothers retested at 34 weeks'] },
  { id: 'deliveries', title: 'Deliveries and newborn care', fields: ['Normal deliveries', 'Caesarean sections', 'Vacuum deliveries', 'Forceps deliveries', 'Single births', 'Twin births', 'Triplets', 'Other multiple births', 'Breastfeeding within 30 minutes', 'Babies given eye prophylaxis', 'Babies given chlorhexidine cord care', 'Babies given methylated spirit cord care', 'Eligible women given corticosteroids at 28–34 weeks', 'Maternal deaths', 'Live births', 'Stillbirths'] },
  { id: 'postnatal', title: 'Postnatal care', fields: ['Postnatal registrants', 'First PNC on day 1 or 2', 'First PNC on day 3–7', 'First PNC from day 8 onward', 'Newborn referrals in', 'Newborn referrals out', 'Maternal referrals in', 'Maternal referrals out'] },
  { id: 'morbidity-referrals', title: 'Morbidity, abnormalities and referrals', fields: ['Vesico-vaginal fistula cases', 'Vesico-vaginal fistula repaired', 'Vesico-vaginal fistula referred', 'Drop-foot cases', 'Puerperal psychosis', 'Endometritis / infection', 'Cleft lip / palate', 'Anencephaly', 'Talipes', 'Hydrocephalus', 'Undescended testes', 'Spina bifida', 'Exomphalos', 'Down syndrome', 'Newborn asphyxia', 'Newborn jaundice', 'Cord sepsis', 'Ophthalmia neonatorum', 'Other newborn complications'] },
]
const nutritionSections = [
  { id: 'growth-registrants', title: 'Growth monitoring · first-time registrants', fields: ['Children registered 0–11 months', 'Children registered 12–23 months', 'Children registered 24–59 months', 'Male children weighed', 'Female children weighed', 'Severely underweight (< -3 SD)', 'Moderately underweight (-3 to < -2 SD)', 'Normal weight (>= -2 SD)'] },
  { id: 'growth-attendance', title: 'Growth monitoring · attendance', fields: ['Children attending 0–11 months', 'Children attending 12–23 months', 'Children attending 24–59 months', 'Male children weighed', 'Female children weighed', 'Severely underweight (< -3 SD)', 'Moderately underweight (-3 to < -2 SD)', 'Normal weight (>= -2 SD)'] },
  { id: 'stunting', title: 'Length and height · stunting', fields: ['Children measured 0–11 months', 'Children measured 12–23 months', 'Children measured 24–59 months', 'Severely stunted (< -3 SD)', 'Moderately stunted (-3 to < -2 SD)', 'Normal height (>= -2 SD)'] },
  { id: 'immunization', title: 'Immunization', fields: ['BCG', 'Polio 0', 'Polio 1', 'Polio 2', 'Polio 3', 'Penta 1', 'Penta 2', 'Penta 3', 'PCV 1', 'PCV 2', 'PCV 3', 'Measles-Rubella 1', 'Measles-Rubella 2 (18 months)', 'Yellow fever', 'Men A'] },
  { id: 'vitamin-a', title: 'Vitamin A supplementation', fields: ['Children dosed 6–11 months', 'Children dosed 12–59 months', 'Total children dosed 6–59 months'] },
  { id: 'pmtct', title: 'PMTCT', fields: ['HIV-exposed children', 'Given co-trimoxazole prophylaxis', 'Early infant diagnosis completed', 'Positive test results', 'HIV-exposed children evaluated at 18 months'] },
  { id: 'feeding', title: 'Infant and young child feeding', fields: ['Total live births', 'Babies put to breast within 30 minutes', 'Exclusively breastfed at discharge', 'Children assessed at month 3', 'Exclusive breastfeeding at month 3', 'Children assessed at month 6', 'Introduced to complementary foods', 'New community IYCF registrants', 'Community home visits'] },
]

const reportTemplateOptions = [
  { id: 'family-planning', label: 'Family planning', description: 'Monthly commodity balance', icon: Baby },
  { id: 'disease-surveillance', label: 'Disease surveillance', description: 'Cases by age and sex', icon: Activity },
  { id: 'outpatient-morbidity', label: 'Outpatient morbidity', description: 'Insurance and visit type', icon: UsersRound },
  { id: 'midwife-returns', label: 'Midwives returns', description: 'Maternal and newborn care', icon: Stethoscope },
  { id: 'nutrition-child-health', label: 'Nutrition & child health', description: 'Growth, vaccines and feeding', icon: HeartPulse },
]
const reportTitles = {
  'family-planning': 'Monthly Family Planning Returns',
  'disease-surveillance': 'Communicable Disease Surveillance',
  'outpatient-morbidity': 'Outpatient Morbidity by Age, Insurance and Visit Type',
  'midwife-returns': 'Monthly Midwives Returns - Form A',
  'nutrition-child-health': 'Monthly Nutrition and Child Health Report',
}
const customFieldTypes = [
  { id: 'text', label: 'Text' },
  { id: 'number', label: 'Number' },
  { id: 'date', label: 'Date' },
  { id: 'choice', label: 'Choice list' },
]
const fieldNameExamples = ['e.g. Mother’s name', 'e.g. Age', 'e.g. Gender']

function newId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function readStored(storageName, key, fallback) {
  try {
    return { ...fallback, ...JSON.parse(window[storageName].getItem(key) || '{}') }
  } catch {
    return fallback
  }
}

function writeStored(storageName, key, value) {
  try {
    window[storageName].setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be blocked or full; the report keeps working for this visit.
  }
}

function blankField() {
  return { id: newId('field'), name: '', type: 'text', options: '' }
}

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Appointments', icon: CalendarDays },
  { label: 'Patients', icon: UsersRound },
  { label: 'Departments', icon: Stethoscope },
  { label: 'Medical records', icon: FileText },
]

function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <span className="brand-mark"><HeartPulse size={21} strokeWidth={2.5} /></span>
      <span>Care<span className="brand-light">Desk</span></span>
    </div>
  )
}

function LegalDialog({ documentName, onClose }) {
  const isPrivacy = documentName === 'Privacy'

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="legal-dialog" role="dialog" aria-modal="true" aria-labelledby="legal-title">
        <div className="modal-heading">
          <div><span className="eyebrow">CAREDESK DEMO</span><h2 id="legal-title">{isPrivacy ? 'Privacy notice' : 'Workspace policies'}</h2></div>
          <button type="button" className="icon-button" aria-label="Close" onClick={onClose}><X size={19} /></button>
        </div>
        {isPrivacy ? <div className="legal-content">
          <p className="legal-intro">This notice describes how information is handled in this CareDesk demonstration.</p>
          <h3>Demo data only</h3>
          <p>This app has no connected patient database or verified sign-in. Example patients are sample records. Patients you add are cleared when the page reloads. Report entries stay in the current browser tab until it is closed. Custom form layouts and added commodities are saved in this browser until its site data is cleared.</p>
          <h3>Do not enter real patient information</h3>
          <p>Do not use this demo to store names, health details, contact information, or other sensitive information about real people. This includes the fields in custom forms your department creates.</p>
          <h3>Downloaded CSV files</h3>
          <p>A downloaded report is saved to your device as a CSV file. CareDesk cannot protect or delete that copy once it has been downloaded.</p>
          <h3>Before production use</h3>
          <p>A production deployment needs an approved privacy notice and appropriate identity, access, storage, encryption, audit, and retention controls configured by the responsible organization.</p>
        </div> : <div className="legal-content">
          <p className="legal-intro">These guidelines apply to use of the CareDesk demonstration workspace.</p>
          <h3>Authorized and careful use</h3>
          <p>Use a production workspace only when authorized by your organization. This demo accepts any name and password and does not authenticate staff.</p>
          <h3>Protect information</h3>
          <p>Use only sample information here. In an approved production system, access only the information needed for your role and protect your credentials and device.</p>
          <h3>Custom forms and exports</h3>
          <p>Collect only the fields your department needs. Check reports before sharing them, and store or send downloaded CSV files only in ways your organization has approved.</p>
          <h3>Clinical and operational decisions</h3>
          <p>This demo is not a medical record, clinical decision tool, or emergency service. Verify information in approved systems and follow your organization’s procedures.</p>
          <h3>Report concerns</h3>
          <p>For a production deployment, report suspected data exposure or unauthorized access promptly through your organization’s established support and incident channels.</p>
        </div>}
        <div className="modal-actions"><button type="button" className="primary-button" onClick={onClose}>Close</button></div>
      </section>
    </div>
  )
}

function GroupedReportTable({ sections, fieldValue, updateField }) {
  return (
    <div className="table-scroll report-table-scroll">
      <table className="report-table grouped-report-table">
        <thead><tr><th>REPORT SECTION</th><th>INDICATOR</th><th>VALUE</th></tr></thead>
        {sections.map((section) => <tbody key={section.id}>
          <tr className="report-section-row"><th colSpan="3">{section.title}</th></tr>
          {section.fields.map((field) => <tr key={field}>
            <td>{section.title}</td>
            <td className="report-row-name">{field}</td>
            <td><input className="report-number-input" type="number" min="0" step="1" aria-label={`${section.title}: ${field}`} value={fieldValue(section.id, field)} onChange={(event) => updateField(section.id, field, event.target.value)} /></td>
          </tr>)}
        </tbody>)}
      </table>
    </div>
  )
}

function DiseaseReportTable({ selectedGender, setSelectedGender, fieldValue, updateField }) {
  const sections = diseaseConditions.reduce((groups, condition) => {
    const current = groups.at(-1)
    if (current?.title === condition.section) current.conditions.push(condition)
    else groups.push({ title: condition.section, conditions: [condition] })
    return groups
  }, [])

  return <>
    <div className="report-gender-tabs" role="group" aria-label="Sex">
      {['Male', 'Female'].map((gender) => <button type="button" key={gender} className={selectedGender === gender ? 'active' : ''} aria-pressed={selectedGender === gender} onClick={() => setSelectedGender(gender)}>{gender}</button>)}
    </div>
    <div className="table-scroll report-table-scroll">
      <table className="report-table disease-report-table">
        <thead><tr><th>SECTION / CONDITION</th>{diseaseAgeGroups.map((age) => <th key={age}>{age.toUpperCase()}</th>)}</tr></thead>
        {sections.map((section) => <tbody key={section.title}>
          <tr className="report-section-row"><th colSpan={diseaseAgeGroups.length + 1}>{section.title}</th></tr>
          {section.conditions.map((condition) => <tr key={condition.id}>
            <td className="report-row-name">{condition.name}</td>
            {diseaseAgeGroups.map((age) => <td key={age}><input className="report-number-input" type="number" min="0" step="1" aria-label={`${condition.name}, ${selectedGender}, ${age}`} value={fieldValue(condition.id, `${selectedGender}.${age}`)} onChange={(event) => updateField(condition.id, `${selectedGender}.${age}`, event.target.value)} /></td>)}
          </tr>)}
        </tbody>)}
      </table>
    </div>
  </>
}

function OutpatientReportTable({ fieldValue, updateField }) {
  function count(ageGroup, visitId, gender) {
    return Number(fieldValue(ageGroup, `${visitId}.${gender}`))
  }

  function visitTotal(ageGroup, visitId) {
    return count(ageGroup, visitId, 'Male') + count(ageGroup, visitId, 'Female')
  }

  function genderTotal(ageGroup, gender) {
    return outpatientVisitTypes.reduce((total, visit) => total + count(ageGroup, visit.id, gender), 0)
  }

  function allVisitsTotal(ageGroup) {
    return genderTotal(ageGroup, 'Male') + genderTotal(ageGroup, 'Female')
  }

  function allAgeTotal(callback) {
    return outpatientAgeGroups.reduce((total, ageGroup) => total + callback(ageGroup), 0)
  }

  return (
    <div className="table-scroll report-table-scroll">
      <table className="report-table outpatient-report-table">
        <thead>
          <tr><th rowSpan="2">AGE GROUP</th>{outpatientVisitTypes.map((visit) => <th key={visit.id} colSpan="3">{visit.name.toUpperCase()}</th>)}<th colSpan="3">ALL VISITS</th></tr>
          <tr>{outpatientVisitTypes.map((visit) => <Fragment key={visit.id}><th>MALE</th><th>FEMALE</th><th>TOTAL</th></Fragment>)}<th>MALE</th><th>FEMALE</th><th>TOTAL</th></tr>
        </thead>
        <tbody>
          {outpatientAgeGroups.map((ageGroup) => <tr key={ageGroup}>
            <td className="report-row-name">{ageGroup}</td>
            {outpatientVisitTypes.map((visit) => <Fragment key={visit.id}>
              {['Male', 'Female'].map((gender) => <td key={gender}><input className="report-number-input" type="number" min="0" step="1" aria-label={`${ageGroup}, ${visit.name}, ${gender}`} value={fieldValue(ageGroup, `${visit.id}.${gender}`)} onChange={(event) => updateField(ageGroup, `${visit.id}.${gender}`, event.target.value)} /></td>)}
              <td className="calculated-cell">{visitTotal(ageGroup, visit.id)}</td>
            </Fragment>)}
            <td className="calculated-cell">{genderTotal(ageGroup, 'Male')}</td><td className="calculated-cell">{genderTotal(ageGroup, 'Female')}</td><td className="calculated-cell">{allVisitsTotal(ageGroup)}</td>
          </tr>)}
          <tr className="report-total-row"><td className="report-row-name">All ages</td>{outpatientVisitTypes.map((visit) => <Fragment key={visit.id}>
            {['Male', 'Female'].map((gender) => <td key={gender} className="calculated-cell">{allAgeTotal((age) => count(age, visit.id, gender))}</td>)}
            <td className="calculated-cell">{allAgeTotal((age) => visitTotal(age, visit.id))}</td>
          </Fragment>)}
            <td className="calculated-cell">{allAgeTotal((age) => genderTotal(age, 'Male'))}</td><td className="calculated-cell">{allAgeTotal((age) => genderTotal(age, 'Female'))}</td><td className="calculated-cell">{allAgeTotal(allVisitsTotal)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function CustomFormBuilder({ form, takenTitles, onSave, onCancel }) {
  const [title, setTitle] = useState(form?.title ?? '')
  const [fields, setFields] = useState(() => form
    ? form.fields.map((field) => ({ ...field, options: field.options.join(', ') }))
    : [blankField(), blankField(), blankField()])
  const [error, setError] = useState('')

  function updateBuilderField(id, change) {
    setFields((current) => current.map((field) => field.id === id ? { ...field, ...change } : field))
    setError('')
  }

  function saveForm(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanFields = fields
      .map((field) => ({
        ...field,
        name: field.name.trim(),
        options: field.type === 'choice' ? [...new Set(field.options.split(',').map((option) => option.trim()).filter(Boolean))] : [],
      }))
      .filter((field) => field.name)
    const names = cleanFields.map((field) => field.name.toLowerCase())
    if (!cleanTitle) return setError('Give this form a name.')
    if (takenTitles.includes(cleanTitle.toLowerCase())) return setError('Your department already has a form with this name.')
    if (cleanFields.length === 0) return setError('Add at least one field.')
    if (new Set(names).size !== names.length) return setError('Each field needs a different name.')
    const emptyChoice = cleanFields.find((field) => field.type === 'choice' && field.options.length === 0)
    if (emptyChoice) return setError(`Add the options for “${emptyChoice.name}”, separated by commas.`)
    onSave({ id: form?.id ?? newId('custom'), title: cleanTitle, fields: cleanFields })
  }

  return (
    <form className="custom-form-builder" onSubmit={saveForm} noValidate>
      <label className="custom-builder-label">Form name<input className="custom-builder-input" value={title} placeholder="e.g. Number of births per month" autoFocus onChange={(event) => { setTitle(event.target.value); setError('') }} /></label>
      <div className="custom-field-list">
        {fields.map((field, index) => <div className="custom-field-row" key={field.id}>
          <label className="custom-builder-label">Field {index + 1}<input className="custom-builder-input" value={field.name} placeholder={fieldNameExamples[index] ?? 'Field name'} onChange={(event) => updateBuilderField(field.id, { name: event.target.value })} /></label>
          <label className="custom-builder-label">Type<select className="custom-builder-input" value={field.type} onChange={(event) => updateBuilderField(field.id, { type: event.target.value })}>{customFieldTypes.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}</select></label>
          {field.type === 'choice' ? <label className="custom-builder-label">Options, separated by commas<input className="custom-builder-input" value={field.options} placeholder="e.g. Female, Male" onChange={(event) => updateBuilderField(field.id, { options: event.target.value })} /></label> : <span />}
          <button type="button" className="icon-button" aria-label={`Remove field ${index + 1}`} disabled={fields.length === 1} onClick={() => setFields((current) => current.filter((item) => item.id !== field.id))}><Trash2 size={15} /></button>
        </div>)}
      </div>
      <button type="button" className="secondary-button custom-add-field" onClick={() => setFields((current) => [...current, blankField()])}><Plus size={15} /> Add another field</button>
      {error && <p className="custom-form-error" role="alert">{error}</p>}
      <div className="modal-actions"><button type="button" className="secondary-button" onClick={onCancel}>Cancel</button><button type="submit" className="primary-button"><Check size={15} /> Save form</button></div>
    </form>
  )
}

function CustomFormTable({ form, rows, updateCell, addRow, removeRow }) {
  return <>
    <div className="table-scroll report-table-scroll">
      <table className="report-table custom-record-table">
        <thead><tr>{form.fields.map((field) => <th key={field.id}>{field.name.toUpperCase()}</th>)}<th /></tr></thead>
        <tbody>
          {rows.map((row, index) => <tr key={row.id}>
            {form.fields.map((field) => {
              const value = row.values[field.id] ?? ''
              const label = `Record ${index + 1}: ${field.name}`
              const update = (event) => updateCell(row.id, field.id, event.target.value)
              return <td key={field.id}>{field.type === 'choice'
                ? <select className="report-text-input" aria-label={label} value={value} onChange={update}><option value="">Select</option>{[...field.options, ...(value && !field.options.includes(value) ? [value] : [])].map((option) => <option key={option}>{option}</option>)}</select>
                : <input className="report-text-input" type={field.type} aria-label={label} value={value} onChange={update} />}</td>
            })}
            <td className="custom-record-action"><button type="button" className="icon-button" aria-label={`Remove record ${index + 1}`} onClick={() => removeRow(row.id)}><Trash2 size={15} /></button></td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <div className="custom-table-actions"><button type="button" className="secondary-button small-button" onClick={addRow}><Plus size={14} /> Add record</button></div>
  </>
}

function DepartmentReports({ department }) {
  const [template, setTemplate] = useState('family-planning')
  const reportDepartment = department
  const [reportMonth, setReportMonth] = useState(() => {
    const today = new Date()
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
  })
  const [selectedGender, setSelectedGender] = useState('Male')
  const storageKey = `caredesk-report-drafts:${department}`
  const [values, setValues] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey) || '{}')
    } catch {
      return {}
    }
  })
  const [downloaded, setDownloaded] = useState(false)
  const configKey = `caredesk-report-config:${department}`
  const recordsKey = `caredesk-report-records:${department}`
  const [config, setConfig] = useState(() => readStored('localStorage', configKey, { commodities: [], forms: [] }))
  const [customRecords, setCustomRecords] = useState(() => readStored('sessionStorage', recordsKey, {}))
  const [builder, setBuilder] = useState(null)
  const [commodityName, setCommodityName] = useState('')
  const [commodityError, setCommodityError] = useState('')
  const templateTabsRef = useRef(null)

  const commodityItems = [...familyPlanningItems, ...config.commodities]
  const activeForm = config.forms.find((form) => form.id === template)
  const activeRecordsKey = `${template}.${reportMonth}`
  const activeRecords = customRecords[activeRecordsKey]?.length ? customRecords[activeRecordsKey] : [{ id: 'first-record', values: {} }]
  const filledRecords = activeForm ? activeRecords.filter((record) => activeForm.fields.some((field) => String(record.values[field.id] ?? '').trim())) : []

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(values))
  }, [storageKey, values])

  useEffect(() => {
    const tabs = templateTabsRef.current
    const activeTab = tabs?.querySelector('.active')
    if (activeTab) tabs.scrollLeft = activeTab.offsetLeft - tabs.offsetLeft - (tabs.clientWidth - activeTab.offsetWidth) / 2
  }, [template])

  useEffect(() => {
    writeStored('localStorage', configKey, config)
  }, [configKey, config])

  useEffect(() => {
    writeStored('sessionStorage', recordsKey, customRecords)
  }, [recordsKey, customRecords])

  function addCommodity(event) {
    event.preventDefault()
    const name = commodityName.trim()
    if (!name) return setCommodityError('Enter a commodity or brand name.')
    if (commodityItems.some((item) => item.name.toLowerCase() === name.toLowerCase())) return setCommodityError(`${name} is already on this report.`)
    setConfig((current) => ({ ...current, commodities: [...current.commodities, { id: newId('commodity'), name }] }))
    setCommodityName('')
    setCommodityError('')
    setDownloaded(false)
  }

  function removeCommodity(item) {
    if (!window.confirm(`Remove ${item.name} and its entries from this report?`)) return
    setConfig((current) => ({ ...current, commodities: current.commodities.filter((commodity) => commodity.id !== item.id) }))
    setDownloaded(false)
  }

  function saveCustomForm(form) {
    setConfig((current) => ({
      ...current,
      forms: current.forms.some((item) => item.id === form.id)
        ? current.forms.map((item) => item.id === form.id ? form : item)
        : [...current.forms, form],
    }))
    setTemplate(form.id)
    setBuilder(null)
    setDownloaded(false)
  }

  function deleteCustomForm(form) {
    if (!window.confirm(`Delete “${form.title}” and all its records?`)) return
    setConfig((current) => ({ ...current, forms: current.forms.filter((item) => item.id !== form.id) }))
    setCustomRecords((current) => Object.fromEntries(Object.entries(current).filter(([key]) => !key.startsWith(`${form.id}.`))))
    setTemplate('family-planning')
    setDownloaded(false)
  }

  function saveRecords(records) {
    setCustomRecords((current) => ({ ...current, [activeRecordsKey]: records }))
    setDownloaded(false)
  }

  function updateRecordCell(recordId, fieldId, value) {
    saveRecords(activeRecords.map((record) => record.id === recordId ? { ...record, values: { ...record.values, [fieldId]: value } } : record))
  }

  function valueKey(key, field) {
    return `${template}.${reportMonth}.${key}.${field}`
  }

  function fieldValue(key, field) {
    return values[valueKey(key, field)] ?? ''
  }

  function updateField(key, field, value) {
    const storageField = valueKey(key, field)
    setValues((current) => ({ ...current, [storageField]: value }))
    setDownloaded(false)
  }

  function closingBalance(itemId) {
    return Number(fieldValue(itemId, 'opening'))
      + Number(fieldValue(itemId, 'receivedGhs'))
      + Number(fieldValue(itemId, 'receivedOther'))
      - Number(fieldValue(itemId, 'issuedGhs'))
      - Number(fieldValue(itemId, 'issuedOther'))
      - Number(fieldValue(itemId, 'adjustments'))
      - Number(fieldValue(itemId, 'transfers'))
  }

  function movementTotal(itemId, firstField, secondField) {
    return Number(fieldValue(itemId, firstField)) + Number(fieldValue(itemId, secondField))
  }

  function outpatientTotal(ageGroup, gender, visitType = '') {
    const visitTypes = visitType ? [visitType] : outpatientVisitTypes
    return visitTypes.reduce((total, visit) => total + Number(fieldValue(ageGroup, `${visit.id}.${gender}`)), 0)
  }

  function downloadReport() {
    const isFamilyPlanning = template === 'family-planning'
    const metadata = [
      ['CareDesk departmental report'],
      ['Report', reportTitle],
      ['Department', reportDepartment],
      ['Reporting month', reportMonth],
      ...(activeForm ? [['Total records', filledRecords.length]] : []),
      [],
    ]
    let dataRows
    if (activeForm) {
      dataRows = [
        activeForm.fields.map((field) => field.name),
        ...filledRecords.map((record) => activeForm.fields.map((field) => record.values[field.id] ?? '')),
      ]
    } else if (isFamilyPlanning) {
      dataRows = [
        ['Commodity', 'Beginning balance', 'Received from GHS', 'Received from other sources', 'Received total', 'Issued to GHS', 'Issued to other sources', 'Issued total', 'Loss or adjustment', 'Transfer out', 'Ending balance', 'Unit price', 'Quantity collected'],
        ...commodityItems.map((item) => [
          item.name,
          fieldValue(item.id, 'opening'),
          fieldValue(item.id, 'receivedGhs'),
          fieldValue(item.id, 'receivedOther'),
          movementTotal(item.id, 'receivedGhs', 'receivedOther'),
          fieldValue(item.id, 'issuedGhs'),
          fieldValue(item.id, 'issuedOther'),
          movementTotal(item.id, 'issuedGhs', 'issuedOther'),
          fieldValue(item.id, 'adjustments'),
          fieldValue(item.id, 'transfers'),
          closingBalance(item.id),
          fieldValue(item.id, 'unitPrice'),
          fieldValue(item.id, 'quantityCollected'),
        ]),
      ]
    } else if (template === 'disease-surveillance') {
      dataRows = [
        ['Section', 'Condition', ...diseaseAgeGroups.map((age) => `Male ${age}`), ...diseaseAgeGroups.map((age) => `Female ${age}`)],
        ...diseaseConditions.map((condition) => [
          condition.section,
          condition.name,
          ...['Male', 'Female'].flatMap((gender) => diseaseAgeGroups.map((age) => fieldValue(condition.id, `${gender}.${age}`))),
        ]),
      ]
    } else if (template === 'outpatient-morbidity') {
      dataRows = [
        ['Age group', ...outpatientVisitTypes.flatMap((visit) => [`${visit.name} · Male`, `${visit.name} · Female`, `${visit.name} · Total`]), 'All visits · Male', 'All visits · Female', 'All visits · Total'],
        ...outpatientAgeGroups.map((age) => [
          age,
          ...outpatientVisitTypes.flatMap((visit) => [fieldValue(age, `${visit.id}.Male`), fieldValue(age, `${visit.id}.Female`), outpatientTotal(age, 'Male', visit.id) + outpatientTotal(age, 'Female', visit.id)]),
          outpatientTotal(age, 'Male'),
          outpatientTotal(age, 'Female'),
          outpatientTotal(age, 'Male') + outpatientTotal(age, 'Female'),
        ]),
        ['All ages', ...outpatientVisitTypes.flatMap((visit) => [
          outpatientAgeGroups.reduce((sum, age) => sum + Number(fieldValue(age, `${visit.id}.Male`)), 0),
          outpatientAgeGroups.reduce((sum, age) => sum + Number(fieldValue(age, `${visit.id}.Female`)), 0),
          outpatientAgeGroups.reduce((sum, age) => sum + outpatientTotal(age, 'Male', visit.id) + outpatientTotal(age, 'Female', visit.id), 0),
        ]), ...['Male', 'Female'].map((gender) => outpatientAgeGroups.reduce((sum, age) => sum + outpatientTotal(age, gender), 0)), outpatientAgeGroups.reduce((sum, age) => sum + outpatientTotal(age, 'Male') + outpatientTotal(age, 'Female'), 0)],
      ]
    } else {
      const sections = template === 'midwife-returns' ? midwifeSections : nutritionSections
      dataRows = [
        ['Section', 'Indicator', 'Value'],
        ...sections.flatMap((section) => section.fields.map((field) => [section.title, field, fieldValue(section.id, field)])),
      ]
    }
    const csvEscape = (value) => {
      const text = String(value ?? '')
      // Stops typed text such as =SUM(...) from running as a spreadsheet formula.
      const safeText = /^[=+\-@\t\r]/.test(text) && !/^-?\d+(\.\d+)?$/.test(text) ? `'${text}` : text
      return `"${safeText.replaceAll('"', '""')}"`
    }
    const csv = [...metadata, ...dataRows].map((row) => row.map(csvEscape).join(',')).join('\r\n')
    const blobUrl = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    const fileLabel = activeForm ? activeForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom-form' : template
    const departmentLabel = reportDepartment.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    link.href = blobUrl
    link.download = `${fileLabel}-${departmentLabel}-${reportMonth}.csv`
    document.body.append(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
    setDownloaded(true)
  }

  const reportTabs = [...reportTemplateOptions, ...config.forms.map((form) => ({ id: form.id, label: form.title, description: `${form.fields.length} ${form.fields.length === 1 ? 'field' : 'fields'}`, icon: FileSpreadsheet }))]
  const activeReport = reportTabs.find((option) => option.id === template)
  const reportTitle = activeForm?.title ?? reportTitles[template]
  const activeSections = template === 'midwife-returns' ? midwifeSections : nutritionSections
  const entryCount = activeForm
    ? `${filledRecords.length} ${filledRecords.length === 1 ? 'record' : 'records'} · ${activeForm.fields.length} ${activeForm.fields.length === 1 ? 'field' : 'fields'}`
    : template === 'family-planning'
    ? `${commodityItems.length} commodity lines`
    : template === 'disease-surveillance'
      ? `${diseaseConditions.length} conditions · ${selectedGender} cases`
      : template === 'outpatient-morbidity'
        ? `${outpatientAgeGroups.length} age groups · ${outpatientVisitTypes.length} visit categories`
        : `${activeSections.reduce((total, section) => total + section.fields.length, 0)} indicators`

  return (
    <section className="reports-workspace">
      <div className="report-toolbar">
        <div className="report-filter"><span>Department</span><b className="report-department-value">{reportDepartment}</b></div>
        <label className="report-filter"><span>Reporting month</span><input type="month" value={reportMonth} onChange={(event) => { setReportMonth(event.target.value); setDownloaded(false) }} /></label>
        <div className="report-toolbar-actions">
          <button type="button" className="secondary-button report-download" onClick={() => setBuilder({ form: null })}><Plus size={16} /> New form</button>
          {!builder && <button className="primary-button report-download" onClick={downloadReport}><Download size={16} /> Download CSV</button>}
        </div>
      </div>
      <div className="report-template-tabs" role="tablist" aria-label="Report template" ref={templateTabsRef}>
        {reportTabs.map(({ id, label, description, icon: Icon }) => {
          const selected = template === id && (!builder || builder.form?.id === id)
          return <button type="button" role="tab" key={id} aria-selected={selected} className={selected ? 'active' : ''} onClick={() => { setTemplate(id); setBuilder(null); setDownloaded(false) }}><span className={`template-icon ${id === 'disease-surveillance' ? 'disease-template-icon' : ''}`}><Icon size={17} /></span><span className="template-text"><b>{label}</b><small>{description}</small></span></button>
        })}
      </div>
      <section className="panel report-panel">
        {builder ? <>
          <div className="panel-heading report-panel-heading"><div><span className="eyebrow">{reportDepartment.toUpperCase()}</span><h2>{builder.form ? `Edit ${builder.form.title}` : 'Create a new form'}</h2><p>Name your form and add as many fields as you need. Saving generates the fields for data entry.</p></div></div>
          <CustomFormBuilder key={builder.form?.id ?? 'new'} form={builder.form} takenTitles={config.forms.filter((form) => form.id !== builder.form?.id).map((form) => form.title.toLowerCase())} onSave={saveCustomForm} onCancel={() => setBuilder(null)} />
        </> : <>
        <div className="panel-heading report-panel-heading"><div><span className="eyebrow">{reportDepartment.toUpperCase()} · {reportMonth || 'SELECT MONTH'}</span><h2>{reportTitle}</h2><p>{activeReport.description}</p></div><div className="report-heading-actions">{activeForm && <><button type="button" className="secondary-button small-button" onClick={() => setBuilder({ form: activeForm })}><Pencil size={13} /> Edit form</button><button type="button" className="secondary-button small-button" onClick={() => deleteCustomForm(activeForm)}><Trash2 size={13} /> Delete</button></>}<span className="report-status"><i /> Draft</span></div></div>
        {template === 'family-planning' && <form className="custom-commodity-form" onSubmit={addCommodity} noValidate><label className="custom-builder-label">Add a commodity or brand<input className="custom-builder-input" value={commodityName} placeholder="e.g. Microgynon" onChange={(event) => { setCommodityName(event.target.value); setCommodityError('') }} /></label><button type="submit" className="primary-button"><Check size={15} /> Save</button>{commodityError && <p className="custom-form-error" role="alert">{commodityError}</p>}</form>}
        {activeForm ? <CustomFormTable form={activeForm} rows={activeRecords} updateCell={updateRecordCell} addRow={() => saveRecords([...activeRecords, { id: newId('record'), values: {} }])} removeRow={(recordId) => saveRecords(activeRecords.filter((record) => record.id !== recordId))} /> : template === 'family-planning' ? <div className="table-scroll report-table-scroll"><table className="report-table family-report-table"><thead><tr><th>COMMODITY / BRAND</th><th>BEGINNING BALANCE</th><th>RECEIVED · GHS</th><th>RECEIVED · OTHER</th><th>RECEIVED · TOTAL</th><th>ISSUED · GHS</th><th>ISSUED · OTHER</th><th>ISSUED · TOTAL</th><th>LOSS / ADJUSTMENT</th><th>TRANSFER OUT</th><th>ENDING BALANCE</th><th>UNIT PRICE</th><th>QTY COLLECTED</th></tr></thead><tbody>{commodityItems.map((item) => <tr key={item.id}>
          <td className="report-row-name">{config.commodities.some((commodity) => commodity.id === item.id) ? <span className="custom-commodity-name">{item.name}<button type="button" className="icon-button" aria-label={`Remove ${item.name}`} onClick={() => removeCommodity(item)}><Trash2 size={14} /></button></span> : item.name}</td>
          {[['opening', 'Beginning balance'], ['receivedGhs', 'Received from GHS'], ['receivedOther', 'Received from other sources']].map(([field, label]) => <td key={field}><input className="report-number-input" type="number" min="0" step="1" aria-label={`${item.name}: ${label}`} value={fieldValue(item.id, field)} onChange={(event) => updateField(item.id, field, event.target.value)} /></td>)}
          <td className="calculated-cell" aria-label={`${item.name}: received total`}>{movementTotal(item.id, 'receivedGhs', 'receivedOther')}</td>
          {[[ 'issuedGhs', 'Issued to GHS' ], ['issuedOther', 'Issued to other sources']].map(([field, label]) => <td key={field}><input className="report-number-input" type="number" min="0" step="1" aria-label={`${item.name}: ${label}`} value={fieldValue(item.id, field)} onChange={(event) => updateField(item.id, field, event.target.value)} /></td>)}
          <td className="calculated-cell" aria-label={`${item.name}: issued total`}>{movementTotal(item.id, 'issuedGhs', 'issuedOther')}</td>
          {[['adjustments', 'Loss or adjustment'], ['transfers', 'Transfer out']].map(([field, label]) => <td key={field}><input className="report-number-input" type="number" min="0" step="1" aria-label={`${item.name}: ${label}`} value={fieldValue(item.id, field)} onChange={(event) => updateField(item.id, field, event.target.value)} /></td>)}
          <td className="calculated-cell">{closingBalance(item.id)}</td>
          {[[ 'unitPrice', 'Unit price' ], ['quantityCollected', 'Quantity collected']].map(([field, label]) => <td key={field}><input className="report-number-input" type="number" min="0" step={field === 'unitPrice' ? '0.01' : '1'} aria-label={`${item.name}: ${label}`} value={fieldValue(item.id, field)} onChange={(event) => updateField(item.id, field, event.target.value)} /></td>)}
        </tr>)}</tbody></table></div> : template === 'disease-surveillance' ? <DiseaseReportTable selectedGender={selectedGender} setSelectedGender={setSelectedGender} fieldValue={fieldValue} updateField={updateField} /> : template === 'outpatient-morbidity' ? <OutpatientReportTable fieldValue={fieldValue} updateField={updateField} /> : <GroupedReportTable sections={activeSections} fieldValue={fieldValue} updateField={updateField} />}
        <div className="report-panel-footer"><span><FileSpreadsheet size={15} /> {entryCount}</span>{downloaded && <span className="download-confirmation"><Check size={14} /> CSV downloaded</span>}</div>
        </>}
      </section>
      <p className="report-disclaimer">{activeForm || builder ? 'Forms are saved for your department in this browser. Records stay in this tab until it is closed, so download the CSV to keep them. Use sample information only.' : 'This local report is a CSV based on the provided DHIS2 form examples. It does not submit data to a DHIS2 server.'}</p>
    </section>
  )
}

function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [staffName, setStaffName] = useState('Dr. Akosua Mensah')
  const [department, setDepartment] = useState('General medicine')
  const [activePage, setActivePage] = useState('Overview')
  const [query, setQuery] = useState('')
  const [patientDepartmentFilter, setPatientDepartmentFilter] = useState('All departments')
  const [patientStatusFilter, setPatientStatusFilter] = useState('All statuses')
  const [showPatientForm, setShowPatientForm] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [legalDocument, setLegalDocument] = useState('')
  const [notice, setNotice] = useState('')
  const [patientList, setPatientList] = useState(patients)

  const visiblePatients = useMemo(() => patientList.filter((patient) =>
    `${patient.name} ${patient.id} ${patient.department}`.toLowerCase().includes(query.toLowerCase()),
  ), [patientList, query])
  const directoryPatients = useMemo(() => visiblePatients.filter((patient) =>
    (patientDepartmentFilter === 'All departments' || patient.department === patientDepartmentFilter)
    && (patientStatusFilter === 'All statuses' || patient.status === patientStatusFilter),
  ), [visiblePatients, patientDepartmentFilter, patientStatusFilter])

  function signIn(event) {
    event.preventDefault()
    setSignedIn(true)
  }

  function addPatient(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get('name').trim()
    if (!name) return
    const words = name.split(/\s+/)
    const initials = words.map((word) => word[0]).join('').slice(0, 2).toUpperCase()
    setPatientList((current) => [{
      name,
      initials,
      id: `CD-${Math.floor(25000 + Math.random() * 700)}`,
      gender: form.get('gender'),
      age: `${form.get('age')} yrs`,
      department: form.get('department'),
      visit: 'Today, 02:00 PM',
      status: 'Upcoming',
      tone: 'green',
    }, ...current])
    setShowPatientForm(false)
    setNotice(`${name} added to the patient list`)
    window.setTimeout(() => setNotice(''), 3200)
  }

  if (!signedIn) {
    return (
      <main className="login-shell">
        <section className="login-panel">
          <Brand />
          <div className="login-copy">
            <span className="eyebrow"><ShieldCheck size={14} /> SECURE STAFF PORTAL</span>
            <h1>Care that works<br /><span>better together.</span></h1>
            <p>One calm place to coordinate care, people, and the moments that matter.</p>
          </div>
          <div className="login-art" aria-hidden="true">
            <span className="art-ring art-ring-one" /><span className="art-ring art-ring-two" />
            <span className="art-cross"><HeartPulse size={70} strokeWidth={1.3} /></span>
            <span className="art-chip"><Baby size={17} /> Maternity care</span>
            <span className="art-dot dot-one" /><span className="art-dot dot-two" />
          </div>
          <div className="login-footer"><span>GHANA HEALTHCARE</span><span>Care, clearly connected.</span></div>
        </section>
        <section className="login-form-side">
          <form className="login-form" onSubmit={signIn}>
            <span className="login-small">WELCOME BACK</span>
            <h2>Sign in to your workspace</h2>
            <p className="muted">Enter your staff details to continue.</p>
            <label htmlFor="staff-name">Full name</label>
            <input id="staff-name" value={staffName} onChange={(event) => setStaffName(event.target.value)} required />
            <label htmlFor="department">Department</label>
            <div className="select-wrap"><select id="department" value={department} onChange={(event) => setDepartment(event.target.value)}>
              <option>General medicine</option><option>Maternity</option><option>Cardiology</option><option>Emergency</option><option>Public health</option><option>Administration</option>
            </select><ChevronDown size={17} /></div>
            <label htmlFor="staff-password">Password</label>
            <input id="staff-password" type="password" placeholder="Enter your password" required />
            <div className="form-options"><label className="check-label"><input type="checkbox" defaultChecked /> Remember me</label><button type="button" className="text-button" onClick={() => setNotice('Please contact your system administrator to reset your password.')}>Forgot password?</button></div>
            <button className="primary-button sign-in-button" type="submit">Sign in <ChevronRight size={18} /></button>
            <p className="demo-hint">Demo workspace · any name and password</p>
          </form>
          <div className="login-legal"><span>Protected staff access · CareDesk v1.0</span><div className="policy-links"><button type="button" onClick={() => setLegalDocument('Privacy')}>Privacy</button><button type="button" onClick={() => setLegalDocument('Policies')}>Policies</button></div></div>
        </section>
        {legalDocument && <LegalDialog documentName={legalDocument} onClose={() => setLegalDocument('')} />}
        {notice && <div className="toast"><Check size={17} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={15} /></button></div>}
      </main>
    )
  }

  const title = activePage === 'Overview' ? 'Good morning, Akosua' : activePage
  const isMaternity = department === 'Maternity'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Brand />
        <div className="workspace-switcher"><span className="workspace-icon">GH</span><span><b>Greenfield Hospital</b><small>{department}</small></span><ChevronDown size={15} /></div>
        <span className="nav-caption">WORKSPACE</span>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activePage === label ? 'active' : ''}`} onClick={() => setActivePage(label)}><Icon size={18} /><span>{label}</span>{label === 'Appointments' && <span className="nav-count">8</span>}</button>)}
        </nav>
        <span className="nav-caption tools-caption">CARE TOOLS</span>
        <button className="nav-item" onClick={() => setActivePage('Maternity')}><Baby size={18} /><span>Maternity</span><span className="nav-new">NEW</span></button>
        <button className="nav-item" onClick={() => setActivePage('Reports')}><Activity size={18} /><span>Reports & insights</span></button>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><HeartPulse size={18} /></div><b>Care starts here</b><p>Need help with your workspace?</p><button onClick={() => setNotice('Support team notified. We’ll be in touch shortly.')}>Contact support <ChevronRight size={14} /></button></div>
          <button className="nav-item settings-link" onClick={() => setActivePage('Settings')}><Settings size={18} /><span>Settings</span></button>
          <div className="profile-row"><span className="avatar profile-avatar">AM</span><span className="profile-info"><b>{staffName}</b><small>{department} · Staff</small></span><button className="icon-button profile-menu" title="Sign out" aria-label="Sign out" onClick={() => setSignedIn(false)}><LogOut size={16} /></button></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-button" aria-label="Open menu"><Menu size={20} /></button>
          <div className="breadcrumb">Workspace <ChevronRight size={14} /> <b>{activePage}</b></div>
          <div className="topbar-actions"><span className="today-label"><CalendarDays size={16} /> Monday, 26 October 2026</span><button className={`icon-button notification-button ${showNotifications ? 'selected' : ''}`} title="Notifications" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}><Bell size={18} /><i /></button><span className="avatar top-avatar">AM</span></div>
          {showNotifications && <div className="notification-popover"><b>Notifications</b><p><span className="notification-dot" /> 3 patients are waiting for check-in</p><p><span className="notification-dot yellow" /> Maternity round begins at 11:00 AM</p><button onClick={() => setShowNotifications(false)}>Mark all as read</button></div>}
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div><span className="eyebrow">MONDAY, 26 OCTOBER 2026</span><h1>{isMaternity && activePage === 'Overview' ? 'Maternity overview' : title}<span className="heading-wave">.</span></h1><p>{activePage === 'Overview' ? 'Here’s what’s happening across your hospital today.' : `Manage ${activePage.toLowerCase()} across Greenfield Hospital.`}</p></div>
            {activePage !== 'Reports' && <div className="heading-actions"><button className="secondary-button" onClick={() => setNotice('Today’s report is being prepared for download.')}><FileText size={16} /> Export report</button><button className="primary-button" onClick={() => setShowPatientForm(true)}><Plus size={17} /> Add patient</button></div>}
          </section>

          {activePage === 'Overview' || activePage === 'Maternity' ? <>
            {isMaternity && <section className="maternity-banner"><span className="maternity-symbol"><Baby size={23} /></span><div><b>Maternity care team</b><p>Welcome to your dedicated maternity workspace. Your patients and rounds are ready.</p></div><span className="banner-pulse"><i /> Department active</span></section>}
            <section className="stats-grid" aria-label="Hospital statistics">
              <article className="stat-card"><div className="stat-top"><span>Total patients</span><span className="stat-icon green-icon"><UsersRound size={17} /></span></div><div className="stat-number">1,284</div><div className="stat-meta"><span className="trend-up"><ArrowUpRight size={14} /> 12.8%</span><span>vs last month</span></div><div className="stat-spark spark-green"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
              <article className="stat-card"><div className="stat-top"><span>Appointments</span><span className="stat-icon yellow-icon"><CalendarDays size={17} /></span></div><div className="stat-number">48</div><div className="stat-meta"><span className="trend-up"><ArrowUpRight size={14} /> 8.2%</span><span>scheduled today</span></div><div className="stat-spark spark-yellow"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></article>
              <article className="stat-card"><div className="stat-top"><span>Available beds</span><span className="stat-icon red-icon"><Activity size={17} /></span></div><div className="stat-number">16<span className="stat-denom"> / 82</span></div><div className="stat-meta"><span className="trend-down"><ArrowDownRight size={14} /> 3.1%</span><span>occupancy rate</span></div><div className="bed-progress"><span /></div></article>
              <article className="stat-card"><div className="stat-top"><span>{isMaternity ? 'Expectant mothers' : 'Care team'}</span><span className="stat-icon blue-icon"><Stethoscope size={17} /></span></div><div className="stat-number">{isMaternity ? '36' : '24'}</div><div className="stat-meta"><span className="stat-neutral"><span className="status-dot" /> {isMaternity ? '8 due this month' : '18 on duty'}</span></div><div className="mini-avatars"><span>KM</span><span>EA</span><span>NA</span><span>+5</span></div></article>
            </section>

            <section className="dashboard-grid">
              <article className="panel appointments-panel">
                <div className="panel-heading"><div><h2>Today’s appointments</h2><p>Keep track of what’s coming up.</p></div><button className="link-button" onClick={() => setActivePage('Appointments')}>View all <ChevronRight size={15} /></button></div>
                <div className="appointment-toolbar"><div className="date-control"><button className="icon-button" aria-label="Previous day"><ChevronLeft size={16} /></button><span>Mon, Oct 26</span><button className="icon-button" aria-label="Next day"><ChevronRight size={16} /></button></div><button className="filter-button" onClick={() => setNotice('Showing all appointment statuses.')}><span className="status-dot" /> All appointments <ChevronDown size={14} /></button></div>
                <div className="appointment-list">{appointments.map((appointment) => <div className="appointment-row" key={appointment.name}><span className="appointment-time">{appointment.time}</span><span className={`avatar patient-avatar ${appointment.color}`}>{appointment.initials}</span><div className="appointment-person"><b>{appointment.name}</b><span>{appointment.detail}</span></div><div className="appointment-doctor"><small>PROVIDER</small><span>{appointment.doctor}</span></div><span className={`appointment-status ${appointment.status === 'Checked in' ? 'status-checked' : appointment.status === 'In consultation' ? 'status-consult' : 'status-upcoming'}`}><i />{appointment.status}</span><button className="icon-button more-button" aria-label={`More options for ${appointment.name}`} onClick={() => setNotice(`Appointment options for ${appointment.name}`)}><MoreHorizontal size={18} /></button></div>)}</div>
                <div className="panel-footer"><span><span className="status-dot" /> 4 of 8 appointments shown</span><button className="link-button" onClick={() => setActivePage('Appointments')}>Open schedule <ChevronRight size={15} /></button></div>
              </article>

              <article className="panel overview-panel">
                <div className="panel-heading"><div><h2>{isMaternity ? 'Maternity snapshot' : 'Department overview'}</h2><p>{isMaternity ? 'Your team at a glance.' : 'Occupancy across the hospital.'}</p></div><button className="icon-button" aria-label="More department options" onClick={() => setActivePage('Departments')}><MoreHorizontal size={19} /></button></div>
                {isMaternity ? <div className="maternity-snapshot"><div className="snapshot-total"><span>Active antenatal patients</span><b>36</b><span className="snapshot-note"><span className="trend-up"><ArrowUpRight size={13} /> 4</span> this week</span></div><div className="maternity-progress"><span style={{ width: '68%' }} /></div><div className="snapshot-stats"><span><i className="legend-green" /> Antenatal <b>24</b></span><span><i className="legend-yellow" /> Postnatal <b>8</b></span><span><i className="legend-red" /> In labour <b>4</b></span></div><div className="next-round"><span className="round-icon"><Clock3 size={16} /></span><span><small>NEXT MATERNITY ROUND</small><b>11:00 AM · Ward 2</b></span><button className="icon-button" title="View round"><ChevronRight size={16} /></button></div></div> : <div className="department-list"><div className="department-row"><span className="department-icon dept-green"><HeartPulse size={16} /></span><span className="department-info"><b>General medicine</b><small>24 beds · 18 occupied</small></span><span className="occupancy-value">75%</span><div className="occupancy-bar"><span style={{ width: '75%' }} /></div></div><div className="department-row"><span className="department-icon dept-yellow"><Baby size={16} /></span><span className="department-info"><b>Maternity</b><small>18 beds · 12 occupied</small></span><span className="occupancy-value">67%</span><div className="occupancy-bar"><span style={{ width: '67%' }} /></div></div><div className="department-row"><span className="department-icon dept-red"><Activity size={16} /></span><span className="department-info"><b>Cardiology</b><small>16 beds · 13 occupied</small></span><span className="occupancy-value">81%</span><div className="occupancy-bar"><span style={{ width: '81%' }} /></div></div><div className="department-row"><span className="department-icon dept-blue"><ShieldCheck size={16} /></span><span className="department-info"><b>Emergency</b><small>24 beds · 15 occupied</small></span><span className="occupancy-value">63%</span><div className="occupancy-bar"><span style={{ width: '63%' }} /></div></div><div className="department-row"><span className="department-icon dept-purple"><Globe size={16} /></span><span className="department-info"><b>Public health</b><small>Community outreach · no beds</small></span><span className="occupancy-value">—</span></div></div>}
                <button className="panel-bottom-link" onClick={() => setActivePage('Departments')}>View departments <ChevronRight size={15} /></button>
              </article>
            </section>

            <section className="panel patients-panel">
              <div className="panel-heading patients-heading"><div><h2>Recent patients</h2><p>Latest activity from your patient directory.</p></div><div className="patient-tools"><label className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patients" /></label><button className="secondary-button small-button" onClick={() => setActivePage('Patients')}>View directory <ChevronRight size={15} /></button></div></div>
              <div className="table-scroll"><table><thead><tr><th>PATIENT</th><th>GENDER / AGE</th><th>DEPARTMENT</th><th>NEXT VISIT</th><th>STATUS</th><th /></tr></thead><tbody>{visiblePatients.slice(0, 4).map((patient) => <tr key={patient.id}><td><div className="table-person"><span className={`avatar patient-avatar ${patient.tone}`}>{patient.initials}</span><span><b>{patient.name}</b><small>{patient.id}</small></span></div></td><td>{patient.gender} <span className="table-muted">· {patient.age}</span></td><td><span className="department-tag">{patient.department}</span></td><td>{patient.visit}</td><td><span className={`table-status ${patient.tone}`}><i />{patient.status}</span></td><td><button className="icon-button" aria-label={`Open ${patient.name}`} onClick={() => setNotice(`Patient record: ${patient.name}`)}><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table>{visiblePatients.length === 0 && <div className="empty-state">No patients match “{query}”.</div>}</div>
            </section>
          </> : activePage === 'Patients' ? <section className="panel directory-panel">
            <div className="directory-toolbar">
              <div className="directory-summary"><b>{patientList.length}</b><span>registered patients</span></div>
              <div className="directory-controls">
                <label className="search-field directory-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or patient ID" /></label>
                <label className="directory-select-label"><span>Department</span><select value={patientDepartmentFilter} onChange={(event) => setPatientDepartmentFilter(event.target.value)}><option>All departments</option><option>General</option><option>Maternity</option><option>Cardiology</option><option>Emergency</option><option>Public health</option></select></label>
                <label className="directory-select-label"><span>Status</span><select value={patientStatusFilter} onChange={(event) => setPatientStatusFilter(event.target.value)}><option>All statuses</option><option>Checked in</option><option>In consultation</option><option>Upcoming</option></select></label>
              </div>
            </div>
            <div className="table-scroll directory-table"><table><thead><tr><th>PATIENT</th><th>GENDER / AGE</th><th>DEPARTMENT</th><th>NEXT VISIT</th><th>STATUS</th><th /></tr></thead><tbody>{directoryPatients.map((patient) => <tr key={patient.id}><td><div className="table-person"><span className={`avatar patient-avatar ${patient.tone}`}>{patient.initials}</span><span><b>{patient.name}</b><small>{patient.id}</small></span></div></td><td>{patient.gender} <span className="table-muted">· {patient.age}</span></td><td><span className="department-tag">{patient.department}</span></td><td>{patient.visit}</td><td><span className={`table-status ${patient.tone}`}><i />{patient.status}</span></td><td><button className="icon-button" aria-label={`Open ${patient.name}`} onClick={() => setNotice(`Patient record: ${patient.name}`)}><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table>{directoryPatients.length === 0 && <div className="empty-state">No patients match these filters.</div>}</div>
            <div className="directory-footer">Showing {directoryPatients.length} of {patientList.length} patients</div>
          </section> : activePage === 'Reports' ? <DepartmentReports department={department} /> : <section className="panel section-placeholder"><div className="placeholder-icon">{activePage === 'Appointments' ? <CalendarDays size={22} /> : activePage === 'Medical records' ? <FileText size={22} /> : <Stethoscope size={22} />}</div><span className="eyebrow">CAREDESK WORKSPACE</span><h2>{activePage}</h2><p>Your {activePage.toLowerCase()} workspace is ready. Use the overview to see today’s activity and manage patients.</p>{activePage === 'Appointments' && <div className="placeholder-appointment-list">{appointments.map((item) => <div key={item.name}><span>{item.time}</span><b>{item.name}</b><small>{item.detail} · {item.doctor}</small></div>)}</div>}</section>}
          <footer className="page-footer"><span>© 2026 CareDesk Health Systems</span><div className="policy-links"><button type="button" onClick={() => setLegalDocument('Privacy')}>Privacy</button><button type="button" onClick={() => setLegalDocument('Policies')}>Policies</button></div><span>All systems operational <i /></span></footer>
        </div>
      </main>

          {showPatientForm && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowPatientForm(false)}><form className="patient-modal" onSubmit={addPatient}><div className="modal-heading"><div><span className="eyebrow">PATIENT DIRECTORY</span><h2>Add a patient</h2></div><button type="button" className="icon-button" aria-label="Close" onClick={() => setShowPatientForm(false)}><X size={19} /></button></div><label>Full name<input name="name" placeholder="e.g. Akua Mensah" required autoFocus /></label><div className="modal-fields"><label>Age<input name="age" type="number" min="0" max="250" placeholder="Age" required /></label><label>Gender<select name="gender"><option>Female</option><option>Male</option><option>Other</option></select></label></div><label>Department<select name="department"><option>General</option><option>Maternity</option><option>Cardiology</option><option>Emergency</option><option>Public health</option></select></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowPatientForm(false)}>Cancel</button><button type="submit" className="primary-button"><Plus size={16} /> Add patient</button></div></form></div>}
          {legalDocument && <LegalDialog documentName={legalDocument} onClose={() => setLegalDocument('')} />}
      {notice && <div className="toast"><Check size={17} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={15} /></button></div>}
    </div>
  )
}

export default App

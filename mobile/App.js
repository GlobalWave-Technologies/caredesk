import { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Activity, Baby, Bell, CalendarDays, ChevronRight, Clock3, HeartPulse, Home, Plus, Search, UsersRound } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const palette = {
  ink: '#20352D',
  muted: '#849189',
  green: '#277452',
  paleGreen: '#E8F3EC',
  yellow: '#E3B526',
  red: '#D45B50',
  line: '#E9EDE8',
  canvas: '#F6F8F5',
};

const appointments = [
  { time: '08:30 AM', name: 'Ama Serwaa', detail: 'General check-up', initials: 'AS', color: '#E1F0E5', textColor: '#3F7951', status: 'Checked in' },
  { time: '09:15 AM', name: 'Kwame Asante', detail: 'Follow-up visit', initials: 'KA', color: '#F5EFD8', textColor: '#8C7728', status: 'In consultation' },
  { time: '10:00 AM', name: 'Abena Owusu', detail: 'Antenatal · 28 weeks', initials: 'AO', color: '#F6E8E6', textColor: '#9F6259', status: 'Upcoming' },
];

const patients = ['Ama Serwaa', 'Kwame Asante', 'Abena Owusu', 'Yaw Frimpong'];

function GhanaHealthLogo() {
  return (
    <View style={styles.logoBadge}>
      <View style={styles.logoCircle} />
      <Text style={styles.logoText}>GHS</Text>
    </View>
  );
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [staffName, setStaffName] = useState('Akosua Mensah');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const [department, setDepartment] = useState('Overview');
  const [query, setQuery] = useState('');

  const visiblePatients = useMemo(
    () => patients.filter((name) => name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const maternity = department === 'Maternity';

  if (!signedIn) {
    return (
      <View style={styles.loginScreen}>
        <StatusBar style="dark" />
        <View style={styles.loginBrand}>
          <View style={styles.brandMark}><GhanaHealthLogo /></View>
          <Text style={styles.brandText}>Care<Text style={styles.brandLight}>Desk</Text></Text>
        </View>
        <View style={styles.loginContent}>
          <View style={styles.loginShield}><HeartPulse size={24} color={palette.green} /></View>
          <Text style={styles.loginOverline}>SECURE STAFF PORTAL</Text>
          <Text style={styles.loginHeading}>Welcome to CareDesk</Text>
          <Text style={styles.loginSubheading}>Sign in to your hospital workspace.</Text>
          <Text style={styles.inputLabel}>Full name</Text>
          <TextInput value={staffName} onChangeText={setStaffName} style={styles.loginInput} placeholder="Your full name" placeholderTextColor="#A0AAA2" />
          <Text style={styles.inputLabel}>Department</Text>
          <View style={styles.loginDepartmentRow}>
            <Pressable onPress={() => setDepartment('Overview')} style={[styles.loginDepartment, !maternity && styles.loginDepartmentActive]}><Text style={[styles.loginDepartmentText, !maternity && styles.loginDepartmentTextActive]}>General</Text></Pressable>
            <Pressable onPress={() => setDepartment('Maternity')} style={[styles.loginDepartment, maternity && styles.loginDepartmentActive]}><Baby size={15} color={maternity ? palette.green : palette.muted} /><Text style={[styles.loginDepartmentText, maternity && styles.loginDepartmentTextActive]}>Maternity</Text></Pressable>
          </View>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput value={password} onChangeText={setPassword} style={styles.loginInput} placeholder="Enter your password" placeholderTextColor="#A0AAA2" secureTextEntry />
          <Pressable style={styles.loginButton} onPress={() => { if (!staffName.trim() || !password) { Alert.alert('Sign in', 'Enter your name and password to continue.'); return; } setSignedIn(true); }}>
            <Text style={styles.loginButtonText}>Sign in</Text><ChevronRight size={18} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.loginNote}>Demo workspace · any name and password</Text>
        </View>
        <Text style={styles.loginFooter}>GHANA HEALTHCARE · CARE, CLEARLY CONNECTED</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View style={styles.brand}>
            <View style={styles.brandMark}><GhanaHealthLogo /></View>
            <Text style={styles.brandText}>Care<Text style={styles.brandLight}>Desk</Text></Text>
          </View>
          <Pressable accessibilityLabel="Notifications" onPress={() => Alert.alert('Notifications', '3 patients are waiting for check-in.')} style={styles.iconButton}>
            <Bell size={19} color={palette.ink} /><View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.overline}>GREENFIELD HOSPITAL</Text>
            <Text style={styles.heading}>{maternity ? 'Maternity care' : `Good morning, ${staffName.split(' ')[0]}`}</Text>
            <Text style={styles.subheading}>Monday, 26 October · Accra</Text>
          </View>
          <View style={styles.profileAvatar}><Text style={styles.profileInitials}>AM</Text></View>
        </View>

        <View style={styles.departmentSwitch}>
          <Pressable onPress={() => setDepartment('Overview')} style={[styles.departmentOption, !maternity && styles.departmentActive]}>
            <Text style={[styles.departmentText, !maternity && styles.departmentTextActive]}>Overview</Text>
          </Pressable>
          <Pressable onPress={() => setDepartment('Maternity')} style={[styles.departmentOption, maternity && styles.departmentActive]}>
            <Baby size={15} color={maternity ? palette.green : palette.muted} />
            <Text style={[styles.departmentText, maternity && styles.departmentTextActive]}>Maternity</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: palette.paleGreen }]}><UsersRound size={16} color={palette.green} /></View>
            <Text style={styles.statNumber}>{maternity ? '36' : '1,284'}</Text>
            <Text style={styles.statLabel}>{maternity ? 'Expectant mothers' : 'Total patients'}</Text>
            <Text style={styles.statChange}>↗ 12.8% this month</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#F8F2D8' }]}><CalendarDays size={16} color="#9B8121" /></View>
            <Text style={styles.statNumber}>{maternity ? '12' : '48'}</Text>
            <Text style={styles.statLabel}>{maternity ? 'Maternity visits' : 'Appointments'}</Text>
            <Text style={styles.statChange}>Today · 8 check-ins</Text>
          </View>
        </View>

        {maternity && <View style={styles.maternityBanner}>
          <View style={styles.maternityIcon}><Baby size={20} color="#927A1E" /></View>
          <View style={styles.maternityCopy}><Text style={styles.maternityTitle}>Maternity team active</Text><Text style={styles.maternitySub}>8 mothers due this month · Ward 2</Text></View>
          <ChevronRight size={17} color="#927A1E" />
        </View>}

        <View style={styles.sectionHeader}>
          <View><Text style={styles.sectionTitle}>Today’s appointments</Text><Text style={styles.sectionCaption}>Your next patients, at a glance.</Text></View>
          <Pressable onPress={() => setActiveTab('Schedule')}><Text style={styles.viewAll}>View all</Text></Pressable>
        </View>
        <View style={styles.appointmentList}>
          {appointments.map((appointment) => (
            <Pressable key={appointment.name} onPress={() => Alert.alert(appointment.name, `${appointment.detail} · ${appointment.status}`)} style={styles.appointmentRow}>
              <Text style={styles.appointmentTime}>{appointment.time}</Text>
              <View style={[styles.patientAvatar, { backgroundColor: appointment.color }]}><Text style={[styles.patientInitials, { color: appointment.textColor }]}>{appointment.initials}</Text></View>
              <View style={styles.appointmentInfo}><Text style={styles.patientName}>{appointment.name}</Text><Text style={styles.patientDetail}>{appointment.detail}</Text></View>
              <ChevronRight size={16} color="#9BA69E" />
            </Pressable>
          ))}
          <Pressable onPress={() => setActiveTab('Schedule')} style={styles.scheduleLink}><Clock3 size={14} color={palette.green} /><Text style={styles.scheduleText}>See full schedule</Text><ChevronRight size={14} color={palette.green} /></Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <View><Text style={styles.sectionTitle}>Find a patient</Text><Text style={styles.sectionCaption}>Search your patient directory.</Text></View>
          <Pressable accessibilityLabel="Add patient" onPress={() => Alert.alert('Add patient', 'Patient registration is available in the CareDesk web workspace.')} style={styles.addButton}><Plus size={18} color="#FFFFFF" /></Pressable>
        </View>
        <View style={styles.searchBox}><Search size={16} color="#98A39B" /><TextInput value={query} onChangeText={setQuery} placeholder="Search by patient name" placeholderTextColor="#A0AAA2" style={styles.searchInput} /></View>
        <View style={styles.patientSearchResults}>{visiblePatients.slice(0, 3).map((name) => <Text key={name} style={styles.resultName}>{name}</Text>)}{visiblePatients.length === 0 && <Text style={styles.noResults}>No patients found</Text>}</View>

        <View style={styles.departmentCard}>
          <View style={styles.departmentCardTop}><View style={styles.activityIcon}><Activity size={17} color="#B76B5F" /></View><Text style={styles.departmentCardTitle}>Department overview</Text><Pressable onPress={() => setDepartment('Maternity')}><ChevronRight size={17} color="#89958D" /></Pressable></View>
          <View style={styles.occupancyRow}><Text style={styles.occupancyName}>General medicine</Text><Text style={styles.occupancyValue}>75%</Text></View>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: '75%', backgroundColor: palette.green }]} /></View>
          <View style={styles.occupancyRow}><Text style={styles.occupancyName}>Maternity · 18 beds</Text><Text style={styles.occupancyValue}>67%</Text></View>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: '67%', backgroundColor: palette.yellow }]} /></View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {[
          { label: 'Home', icon: Home },
          { label: 'Schedule', icon: CalendarDays },
          { label: 'Patients', icon: UsersRound },
          { label: 'Maternity', icon: Baby },
        ].map(({ label, icon: Icon }) => (
          <Pressable key={label} onPress={() => { setActiveTab(label); if (label === 'Maternity') setDepartment('Maternity'); }} style={styles.navButton}>
            <Icon size={19} color={activeTab === label ? palette.green : '#9AA49C'} strokeWidth={activeTab === label ? 2.4 : 1.8} />
            <Text style={[styles.navLabel, activeTab === label && styles.navLabelActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginScreen: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 23, paddingTop: 68, paddingBottom: 23, backgroundColor: '#EDF4EC' },
  loginBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  loginContent: { padding: 20, borderWidth: 1, borderColor: '#E4EBE3', borderRadius: 9, backgroundColor: '#FFFFFF' },
  loginShield: { width: 42, height: 42, marginBottom: 15, borderRadius: 9, backgroundColor: palette.paleGreen, alignItems: 'center', justifyContent: 'center' },
  loginOverline: { color: '#819187', fontSize: 8, fontWeight: '700', letterSpacing: 1 },
  loginHeading: { marginTop: 8, color: palette.ink, fontSize: 20, fontWeight: '800' },
  loginSubheading: { marginTop: 5, marginBottom: 13, color: palette.muted, fontSize: 10 },
  inputLabel: { marginTop: 12, marginBottom: 6, color: '#56665B', fontSize: 9, fontWeight: '700' },
  loginInput: { height: 39, paddingHorizontal: 10, borderWidth: 1, borderColor: '#E1E8E1', borderRadius: 5, backgroundColor: '#FFFFFF', color: palette.ink, fontSize: 10 },
  loginDepartmentRow: { flexDirection: 'row', gap: 7 },
  loginDepartment: { minHeight: 34, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1, borderColor: '#E7ECE7', borderRadius: 5 },
  loginDepartmentActive: { borderColor: '#A9C9AE', backgroundColor: '#F0F7F0' },
  loginDepartmentText: { color: '#89958D', fontSize: 9, fontWeight: '600' },
  loginDepartmentTextActive: { color: palette.green, fontWeight: '700' },
  loginButton: { minHeight: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 12, borderRadius: 5, backgroundColor: palette.green },
  loginButtonText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  loginNote: { marginTop: 12, color: '#98A39B', fontSize: 8, textAlign: 'center' },
  loginFooter: { color: '#819286', fontSize: 7, fontWeight: '700', letterSpacing: 0.8, textAlign: 'center' },
  screen: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 28,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 27,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandMark: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: palette.green, backgroundColor: '#F6F8F3', alignItems: 'center', justifyContent: 'center' },
  logoBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#F4D55B', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  logoCircle: { position: 'absolute', width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: palette.green, backgroundColor: 'transparent' },
  logoText: { color: '#184B42', fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  brandText: { color: palette.ink, fontSize: 20, fontWeight: '800', letterSpacing: 0 },
  brandLight: { color: palette.green, fontWeight: '500' },
  iconButton: { width: 36, height: 36, borderWidth: 1, borderColor: palette.line, borderRadius: 9, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  notificationDot: { position: 'absolute', top: 7, right: 8, width: 6, height: 6, borderRadius: 4, backgroundColor: palette.red },
  welcomeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 19 },
  overline: { color: '#89968D', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  heading: { marginTop: 7, color: palette.ink, fontSize: 22, fontWeight: '800', letterSpacing: 0 },
  subheading: { marginTop: 5, color: palette.muted, fontSize: 11 },
  profileAvatar: { width: 39, height: 39, borderRadius: 20, backgroundColor: '#E9EDCE', alignItems: 'center', justifyContent: 'center' },
  profileInitials: { color: '#718333', fontSize: 11, fontWeight: '800' },
  departmentSwitch: { flexDirection: 'row', alignSelf: 'flex-start', gap: 4, padding: 4, marginBottom: 15, borderRadius: 7, backgroundColor: '#EDEFEA' },
  departmentOption: { minHeight: 31, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingHorizontal: 11, borderRadius: 5 },
  departmentActive: { backgroundColor: '#FFFFFF', shadowColor: '#20352D', shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  departmentText: { color: '#869188', fontSize: 10, fontWeight: '600' },
  departmentTextActive: { color: palette.green },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 19 },
  statCard: { flex: 1, minHeight: 123, padding: 12, borderWidth: 1, borderColor: palette.line, borderRadius: 7, backgroundColor: '#FFFFFF' },
  statIcon: { width: 27, height: 27, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  statNumber: { marginTop: 8, color: palette.ink, fontSize: 24, fontWeight: '800' },
  statLabel: { marginTop: 1, color: '#758279', fontSize: 9 },
  statChange: { marginTop: 7, color: '#50845D', fontSize: 8, fontWeight: '600' },
  maternityBanner: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 19, padding: 10, borderWidth: 1, borderColor: '#E9E7D2', borderRadius: 7, backgroundColor: '#F8F6E9' },
  maternityIcon: { width: 33, height: 33, borderRadius: 6, backgroundColor: '#F0EBCF', alignItems: 'center', justifyContent: 'center' },
  maternityCopy: { flex: 1 },
  maternityTitle: { color: '#526146', fontSize: 10, fontWeight: '700' },
  maternitySub: { marginTop: 3, color: '#879078', fontSize: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 },
  sectionTitle: { color: palette.ink, fontSize: 13, fontWeight: '800' },
  sectionCaption: { marginTop: 4, color: '#8D9990', fontSize: 9 },
  viewAll: { color: palette.green, fontSize: 9, fontWeight: '700' },
  appointmentList: { marginBottom: 20, paddingHorizontal: 11, borderWidth: 1, borderColor: palette.line, borderRadius: 7, backgroundColor: '#FFFFFF' },
  appointmentRow: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 9, borderBottomWidth: 1, borderBottomColor: '#F0F2EF' },
  appointmentTime: { width: 54, color: '#78867D', fontSize: 8, fontWeight: '600' },
  patientAvatar: { width: 30, height: 30, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  patientInitials: { fontSize: 8, fontWeight: '800' },
  appointmentInfo: { flex: 1 },
  patientName: { color: '#35493D', fontSize: 10, fontWeight: '700' },
  patientDetail: { marginTop: 4, color: '#909B93', fontSize: 8 },
  scheduleLink: { minHeight: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  scheduleText: { color: palette.green, fontSize: 9, fontWeight: '700' },
  addButton: { width: 30, height: 30, borderRadius: 6, backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center' },
  searchBox: { height: 39, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: palette.line, borderRadius: 6, backgroundColor: '#FFFFFF' },
  searchInput: { flex: 1, color: palette.ink, fontSize: 10 },
  patientSearchResults: { marginBottom: 18, paddingHorizontal: 11, borderRightWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, borderColor: palette.line, borderBottomRightRadius: 6, borderBottomLeftRadius: 6, backgroundColor: '#FFFFFF' },
  resultName: { paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: '#F0F2EF', color: '#56665B', fontSize: 9 },
  noResults: { paddingVertical: 12, color: palette.muted, fontSize: 9 },
  departmentCard: { padding: 13, borderWidth: 1, borderColor: palette.line, borderRadius: 7, backgroundColor: '#FFFFFF' },
  departmentCardTop: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 14 },
  activityIcon: { width: 28, height: 28, borderRadius: 6, backgroundColor: '#F8EBE9', alignItems: 'center', justifyContent: 'center' },
  departmentCardTitle: { flex: 1, color: palette.ink, fontSize: 11, fontWeight: '700' },
  occupancyRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  occupancyName: { color: '#77847B', fontSize: 9 },
  occupancyValue: { color: '#647269', fontSize: 9, fontWeight: '700' },
  progressTrack: { height: 4, marginBottom: 12, overflow: 'hidden', borderRadius: 4, backgroundColor: '#EEF1ED' },
  progressFill: { height: '100%', borderRadius: 4 },
  bottomNav: { minHeight: 65, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 8, paddingBottom: 7, borderTopWidth: 1, borderTopColor: palette.line, backgroundColor: '#FFFFFF' },
  navButton: { minWidth: 58, alignItems: 'center', gap: 4 },
  navLabel: { color: '#99A39B', fontSize: 8, fontWeight: '600' },
  navLabelActive: { color: palette.green, fontWeight: '800' },
  },
});

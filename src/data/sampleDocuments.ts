import { ProcessedDocument } from '../types';

export const SAMPLE_DOCUMENTS: ProcessedDocument[] = [
  {
    id: 'doc-bescom-kannada',
    title: 'ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಬಿಲ್ (BESCOM Electricity Bill)',
    category: 'Utility Bill (Electricity/Water)',
    language: 'Bilingual (Kannada/English)',
    pageCount: 1,
    fileSize: '418 KB',
    previewUrl: '/samples/bescom_bill.svg',
    summary: {
      originalScriptSummary: [
        'ಗ್ರಾಹಕ ಹೆಸರು: ಶ್ರೀ ಸುರೇಶ್ ಕುಮಾರ್ (ಆರ್‌ಆರ್ ಸಂಖ್ಯೆ: E3-44192, ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್ ಉಪವಿಭಾಗ).',
        'ಬಳಕೆಯಾದ ಒಟ್ಟು ಯೂನಿಟ್‌ಗಳು: 248 kWh (ಹಿಂದಿನ ಮಾಪನ: 14202, ಪ್ರಸ್ತುತ ಮಾಪನ: 14450).',
        'ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತ: ₹1,485.00 (ನಿಗದಿತ ದಿನಾಂಕ: 18 ನವೆಂಬರ್ 2026).',
        'ಗೃಹಜ್ಯೋತಿ ಯೋಜನೆಯಡಿ 200 ಯೂನಿಟ್‌ಗಳವರೆಗಿನ ಸಬ್ಸಿಡಿ ಕಡಿತ ಅನ್ವಯಿಸಲಾಗಿದೆ.'
      ],
      englishSummary: [
        'Consumer Name: Sri Suresh Kumar (RR Number: E3-44192, HSR Layout Subdivision).',
        'Total units consumed: 248 kWh (Previous reading: 14202, Current reading: 14450).',
        'Total net payable amount: ₹1,485.00 due on or before 18 November 2026.',
        'Gruha Jyothi zero-bill scheme concession applied for base domestic consumption.'
      ],
      romanizedTransliteration: [
        'Graahaka hesaru: Sri Suresh Kumar (RR Sankhye: E3-44192, HSR Layout Upavibhaaga).',
        'Balakeyaada ottu unitgalu: 248 kWh.',
        'Paavatisabekaada ottu motta: ₹1,485.00 (Nigadhita Dinaanka: 18 Nov 2026).'
      ],
      documentTypeDetected: 'Karnataka Power Transmission & Distribution Monthly Tariff Invoice',
      primaryLanguage: 'Bilingual (Kannada/English)',
      scriptFamily: 'Dravidian',
      issuingAuthority: 'Bangalore Electricity Supply Company Limited (BESCOM)',
      issueDate: '02-11-2026',
      referenceNumber: 'BES-2026-BL-88912'
    },
    fields: [
      {
        id: 'f1',
        keyOriginal: 'ಆರ್.ಆರ್. ಸಂಖ್ಯೆ (RR No)',
        keyEnglish: 'Revenue Register Number',
        valueOriginal: 'E3-44192',
        valueEnglish: 'E3-44192',
        valueNormalized: 'E344192',
        category: 'Identifier',
        confidence: 99.4,
        bbox: { ymin: 140, xmin: 65, ymax: 185, xmax: 310 }
      },
      {
        id: 'f2',
        keyOriginal: 'ಗ್ರಾಹಕರ ಹೆಸರು (Consumer Name)',
        keyEnglish: 'Consumer Name',
        valueOriginal: 'ಶ್ರೀ ಸುರೇಶ್ ಕುಮಾರ್',
        valueEnglish: 'Sri Suresh Kumar',
        valueNormalized: 'Suresh Kumar',
        category: 'Citizen Info',
        confidence: 98.7,
        bbox: { ymin: 195, xmin: 65, ymax: 240, xmax: 420 }
      },
      {
        id: 'f3',
        keyOriginal: 'ಖಾತೆ ಐಡಿ (Account ID)',
        keyEnglish: 'Account ID',
        valueOriginal: '9920148812',
        valueEnglish: '9920148812',
        valueNormalized: '9920148812',
        category: 'Identifier',
        confidence: 99.1,
        bbox: { ymin: 140, xmin: 520, ymax: 185, xmax: 780 }
      },
      {
        id: 'f4',
        keyOriginal: 'ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ದರಪಟ್ಟಿ (Tariff Category)',
        keyEnglish: 'Tariff Schedule',
        valueOriginal: 'LT-2(a) ಗೃಹಬಳಕೆ (Domestic)',
        valueEnglish: 'LT-2(a) Domestic Light & Fan',
        valueNormalized: 'LT-2a',
        category: 'Technical / Usage',
        confidence: 97.5,
        bbox: { ymin: 250, xmin: 65, ymax: 295, xmax: 440 }
      },
      {
        id: 'f5',
        keyOriginal: 'ಬಳಕೆಯಾದ ಯೂನಿಟ್‌ಗಳು (Units Consumed)',
        keyEnglish: 'Units Consumed',
        valueOriginal: '248 kWh (ಯೂನಿಟ್)',
        valueEnglish: '248 kWh Units',
        valueNormalized: '248',
        category: 'Technical / Usage',
        confidence: 99.0,
        bbox: { ymin: 360, xmin: 65, ymax: 410, xmax: 330 }
      },
      {
        id: 'f6',
        keyOriginal: 'ಮೀಟರ್ ಓದುವಿಕೆ ದಿನಾಂಕ (Meter Reading Date)',
        keyEnglish: 'Meter Reading Date',
        valueOriginal: '02/11/2026',
        valueEnglish: '02 Nov 2026',
        valueNormalized: '2026-11-02',
        category: 'Date & Time',
        confidence: 98.2,
        bbox: { ymin: 360, xmin: 520, ymax: 410, xmax: 760 }
      },
      {
        id: 'f7',
        keyOriginal: 'ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ (Net Payable)',
        keyEnglish: 'Net Payable Amount',
        valueOriginal: '₹ 1,485.00',
        valueEnglish: 'INR 1,485.00',
        valueNormalized: '1485.00',
        category: 'Monetary',
        confidence: 99.8,
        bbox: { ymin: 520, xmin: 480, ymax: 585, xmax: 880 }
      },
      {
        id: 'f8',
        keyOriginal: 'ಪಾವತಿ ನಿಗದಿತ ದಿನಾಂಕ (Due Date)',
        keyEnglish: 'Payment Due Date',
        valueOriginal: '18/11/2026',
        valueEnglish: '18 Nov 2026',
        valueNormalized: '2026-11-18',
        category: 'Date & Time',
        confidence: 98.9,
        bbox: { ymin: 600, xmin: 480, ymax: 650, xmax: 820 }
      },
      {
        id: 'f9',
        keyOriginal: 'ಉಪವಿಭಾಗ (Sub-division)',
        keyEnglish: 'Sub-division Office',
        valueOriginal: 'ಎಚ್.ಎಸ್.ಆರ್. ಲೇಔಟ್ ಉಪವಿಭಾಗ (HSR Layout)',
        valueEnglish: 'HSR Layout Sub-division, Bengaluru South',
        valueNormalized: 'HSR Layout South',
        category: 'Department & Authority',
        confidence: 96.8,
        bbox: { ymin: 670, xmin: 65, ymax: 720, xmax: 460 }
      }
    ],
    vqaHistory: [
      {
        id: 'vqa-1',
        sender: 'user',
        timestamp: '10:14 AM',
        query: 'What is the due date and total amount payable?',
        answerOriginal: 'ಬಿಲ್ ಪಾವತಿಸಲು ನಿಗದಿತ ಅಂತಿಮ ದಿನಾಂಕ 18/11/2026 ಆಗಿದ್ದು, ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತ ₹ 1,485.00 ಆಗಿದೆ.',
        answerEnglish: 'The payment due date is 18/11/2026, and the total net payable amount is ₹1,485.00.',
        evidenceQuote: 'ಒಟ್ಟು ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ: ₹ 1,485.00 | ನಿಗದಿತ ದಿನಾಂಕ: 18/11/2026',
        groundedBbox: { ymin: 520, xmin: 480, ymax: 650, xmax: 880 },
        confidenceScore: 99.4,
        tokensUsed: 142
      }
    ],
    suggestedQuestions: [
      'Who is the registered consumer and what is their RR number?',
      'How many units were consumed in this billing cycle?',
      'ಯಾವ ದರಪಟ್ಟಿಯ (Tariff category) ಅಡಿಯಲ್ಲಿ ಈ ಬಿಲ್ ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ?',
      'Is there any subsidy or concession mentioned under Gruha Jyothi?'
    ],
    stampsAndSignaturesCount: 2,
    processingTimeMs: 420
  },
  {
    id: 'doc-khasra-hindi',
    title: 'उत्तर प्रदेश भू-अभिलेख (UP Khasra-Khatauni 7/12)',
    category: 'Land Revenue Record (7/12 / Khasra)',
    language: 'Hindi',
    pageCount: 1,
    fileSize: '612 KB',
    previewUrl: '/samples/up_khasra.svg',
    summary: {
      originalScriptSummary: [
        'ग्राम: रामपुर, परगना: सदर, तहसील: सदर, जनपद: लखनऊ (उत्तर प्रदेश).',
        'खाता संख्या: 00142, खसरा संख्या: 384/2, कुल क्षेत्रफल: 1.4280 हेक्टेयर.',
        'भूमिधर काश्तकार: रामेश्वर दयाल पुत्र किशोरी लाल (निवास: ग्राम रामपुर).',
        'वार्षिक भू-राजस्व (लगान): ₹ 125.50, अद्यतन स्थिति: नामांतरण स्वीकृत (दाखिल-खारिज पूर्ण).'
      ],
      englishSummary: [
        'Village: Rampur, Pargana: Sadar, Tehsil: Sadar, District: Lucknow (Uttar Pradesh).',
        'Khata Number: 00142, Khasra Plot: 384/2, Total Area: 1.4280 Hectares.',
        'Recorded Landholder/Bhumidhar: Rameshwar Dayal son of Kishori Lal.',
        'Annual land revenue levy: ₹ 125.50, status: Mutation approved and record updated.'
      ],
      romanizedTransliteration: [
        'Graam: Rampur, Pargana: Sadar, Tehsil: Sadar, Janpad: Lucknow.',
        'Khaata sankhya: 00142, Khasra sankhya: 384/2, Kul kshetraphal: 1.4280 hectare.',
        'Bhumidhar kaashtkaar: Rameshwar Dayal putra Kishori Lal.'
      ],
      documentTypeDetected: 'State Revenue Department Computerized RoR (Record of Rights)',
      primaryLanguage: 'Hindi',
      scriptFamily: 'Devanagari',
      issuingAuthority: 'राजस्व परिषद उत्तर प्रदेश (Board of Revenue UP)',
      issueDate: '14-10-2026',
      referenceNumber: 'UP-ROR-2026-990142'
    },
    fields: [
      {
        id: 'k1',
        keyOriginal: 'खाता संख्या (Khata No)',
        keyEnglish: 'Khata Number',
        valueOriginal: '00142',
        valueEnglish: '00142',
        valueNormalized: '142',
        category: 'Identifier',
        confidence: 99.6,
        bbox: { ymin: 160, xmin: 80, ymax: 205, xmax: 280 }
      },
      {
        id: 'k2',
        keyOriginal: 'खसरा / गाटा संख्या (Plot / Khasra No)',
        keyEnglish: 'Plot / Khasra Number',
        valueOriginal: '384/2',
        valueEnglish: '384/2',
        valueNormalized: '384/2',
        category: 'Identifier',
        confidence: 99.2,
        bbox: { ymin: 160, xmin: 400, ymax: 205, xmax: 600 }
      },
      {
        id: 'k3',
        keyOriginal: 'काश्तकार / खातेदार का नाम',
        keyEnglish: 'Bhumidhar / Landowner Name',
        valueOriginal: 'रामेश्वर दयाल पुत्र किशोरी लाल',
        valueEnglish: 'Rameshwar Dayal s/o Kishori Lal',
        valueNormalized: 'Rameshwar Dayal',
        category: 'Citizen Info',
        confidence: 98.9,
        bbox: { ymin: 230, xmin: 80, ymax: 280, xmax: 520 }
      },
      {
        id: 'k4',
        keyOriginal: 'कुल क्षेत्रफल (Total Land Area)',
        keyEnglish: 'Total Land Area',
        valueOriginal: '1.4280 हेक्टेयर (Hectare)',
        valueEnglish: '1.4280 Hectares',
        valueNormalized: '1.4280 ha',
        category: 'Technical / Usage',
        confidence: 99.1,
        bbox: { ymin: 300, xmin: 80, ymax: 350, xmax: 390 }
      },
      {
        id: 'k5',
        keyOriginal: 'भूमि श्रेणी (Land Classification)',
        keyEnglish: 'Land Tenure Category',
        valueOriginal: 'भूमिधर जो संक्रमणीय भूमि रखते हों (Class 1-A)',
        valueEnglish: 'Bhumidhar with Transferable Rights (Class 1-A)',
        valueNormalized: 'Class-1A',
        category: 'Department & Authority',
        confidence: 97.4,
        bbox: { ymin: 300, xmin: 480, ymax: 350, xmax: 880 }
      },
      {
        id: 'k6',
        keyOriginal: 'देय भू-राजस्व / लगान (Annual Revenue)',
        keyEnglish: 'Annual Land Revenue',
        valueOriginal: '₹ 125.50 प्रति वर्ष',
        valueEnglish: 'INR 125.50 per annum',
        valueNormalized: '125.50',
        category: 'Monetary',
        confidence: 98.5,
        bbox: { ymin: 380, xmin: 80, ymax: 430, xmax: 360 }
      },
      {
        id: 'k7',
        keyOriginal: 'नामांतरण आदेश विवरण (Mutation Remarks)',
        keyEnglish: 'Mutation Order Details',
        valueOriginal: 'आदेशानुसार तहसीलदार सदर दिनांक 12-08-2026 दाखिल-खारिज स्वीकृत।',
        valueEnglish: 'Approved as per Tehsildar Sadar Order dated 12-08-2026 (Mutation Accepted).',
        valueNormalized: 'Mutation Approved',
        category: 'Department & Authority',
        confidence: 96.2,
        bbox: { ymin: 480, xmin: 80, ymax: 560, xmax: 850 }
      }
    ],
    vqaHistory: [
      {
        id: 'vqa-2',
        sender: 'user',
        timestamp: '11:02 AM',
        query: 'इस भूमि का कुल क्षेत्रफल और खातेदार का नाम क्या है?',
        answerOriginal: 'इस भूमि का कुल क्षेत्रफल 1.4280 हेक्टेयर है और खातेदार का नाम "रामेश्वर दयाल पुत्र किशोरी लाल" है।',
        answerEnglish: 'The total area of this land is 1.4280 hectares and the recorded landholder is Rameshwar Dayal s/o Kishori Lal.',
        evidenceQuote: 'खातेदार: रामेश्वर दयाल पुत्र किशोरी लाल | क्षेत्रफल: 1.4280 हेक्टेयर',
        groundedBbox: { ymin: 230, xmin: 80, ymax: 350, xmax: 520 },
        confidenceScore: 99.3,
        tokensUsed: 168
      }
    ],
    suggestedQuestions: [
      'What is the Khata number and Khasra/Gata plot number?',
      'क्या इस भूमि का दाखिल-खारिज (नामांतरण) स्वीकृत हो चुका है?',
      'वार्षिक भू-राजस्व (लगान) कितना निर्धारित है?',
      'Is the landowner classified with transferable rights (संक्रमणीय भूमि)?'
    ],
    stampsAndSignaturesCount: 3,
    processingTimeMs: 380
  },
  {
    id: 'doc-ration-tamil',
    title: 'தமிழ்நாடு குடும்ப அட்டை (TN PDS Smart Ration Card)',
    category: 'Identity & Ration Card (PDS)',
    language: 'Bilingual (Tamil/English)',
    pageCount: 1,
    fileSize: '380 KB',
    previewUrl: '/samples/tn_ration_card.svg',
    summary: {
      originalScriptSummary: [
        'குடும்ப அட்டை எண்: 03/G/0849201, குடும்பத் தலைவர்: மு. செல்வம் (M. Selvam).',
        'அட்டை வகை: PHH (முன்னுரிமை குடும்ப அட்டை - அரிசி அட்டை).',
        'நியாயவிலைக் கடை எண்: 02AC004PN, மண்டலம்: அண்ணா நகர், சென்னை.',
        'குடும்ப உறுப்பினர்களின் எண்ணிக்கை: 4 நபர்கள், மாதாந்திர அரிசி ஒதுக்கீடு: 20 கிலோ (இலவசம்).'
      ],
      englishSummary: [
        'Smart Ration Card Number: 03/G/0849201, Head of Household: M. Selvam.',
        'Card Commodity Category: PHH (Priority Household - Rice Card).',
        'Fair Price Shop (FPS) Code: 02AC004PN, Zone: Anna Nagar, Chennai.',
        'Total enrolled family members: 4, Monthly free rice entitlement: 20 kg.'
      ],
      romanizedTransliteration: [
        'Kudumba attai en: 03/G/0849201, Kudumba thalaivar: M. Selvam.',
        'Attai vagai: PHH (Arisi attai), Angaadi en: 02AC004PN.',
        'Kudumba uruppinargal: 4 nabargal.'
      ],
      documentTypeDetected: 'Tamil Nadu Public Distribution System Biometric Smart Family Card',
      primaryLanguage: 'Bilingual (Tamil/English)',
      scriptFamily: 'Dravidian',
      issuingAuthority: 'உணவுப் பொருள் வழங்கல் மற்றும் நுகர்வோர் பாதுகாப்புத் துறை (Food & Consumer Protection TN)',
      issueDate: '19-03-2026',
      referenceNumber: 'TN-PDS-SMART-2026-08492'
    },
    fields: [
      {
        id: 'r1',
        keyOriginal: 'குடும்ப அட்டை எண் (Card Number)',
        keyEnglish: 'Smart Ration Card Number',
        valueOriginal: '03/G/0849201',
        valueEnglish: '03/G/0849201',
        valueNormalized: '03G0849201',
        category: 'Identifier',
        confidence: 99.5,
        bbox: { ymin: 165, xmin: 70, ymax: 210, xmax: 380 }
      },
      {
        id: 'r2',
        keyOriginal: 'குடும்பத் தலைவர் (Head of Family)',
        keyEnglish: 'Head of Family Name',
        valueOriginal: 'மு. செல்வம் (M. Selvam)',
        valueEnglish: 'M. Selvam',
        valueNormalized: 'M Selvam',
        category: 'Citizen Info',
        confidence: 98.8,
        bbox: { ymin: 220, xmin: 70, ymax: 265, xmax: 450 }
      },
      {
        id: 'r3',
        keyOriginal: 'அட்டை வகை (Card Type)',
        keyEnglish: 'Entitlement Category',
        valueOriginal: 'PHH - அரிசி குடும்ப அட்டை (Rice Card)',
        valueEnglish: 'Priority Household (PHH) Rice Card',
        valueNormalized: 'PHH-Rice',
        category: 'Department & Authority',
        confidence: 99.1,
        bbox: { ymin: 280, xmin: 70, ymax: 325, xmax: 470 }
      },
      {
        id: 'r4',
        keyOriginal: 'நியாயவிலைக் கடை எண் (FPS Code)',
        keyEnglish: 'Fair Price Shop Code',
        valueOriginal: '02AC004PN',
        valueEnglish: '02AC004PN',
        valueNormalized: '02AC004PN',
        category: 'Identifier',
        confidence: 99.0,
        bbox: { ymin: 340, xmin: 70, ymax: 385, xmax: 340 }
      },
      {
        id: 'r5',
        keyOriginal: 'உறுப்பினர்கள் எண்ணிக்கை (Members)',
        keyEnglish: 'Family Member Count',
        valueOriginal: '4 (பெரியவர்கள்: 2, குழந்தைகள்: 2)',
        valueEnglish: '4 (Adults: 2, Children: 2)',
        valueNormalized: '4',
        category: 'Citizen Info',
        confidence: 97.9,
        bbox: { ymin: 400, xmin: 70, ymax: 445, xmax: 430 }
      },
      {
        id: 'r6',
        keyOriginal: 'மாதாந்திர அரிசி ஒதுக்கீடு (Rice Quota)',
        keyEnglish: 'Monthly Rice Entitlement',
        valueOriginal: '20 கிலோ (இலவசம்)',
        valueEnglish: '20 Kilograms (Free of Cost)',
        valueNormalized: '20 kg',
        category: 'Technical / Usage',
        confidence: 98.4,
        bbox: { ymin: 460, xmin: 70, ymax: 505, xmax: 360 }
      }
    ],
    vqaHistory: [
      {
        id: 'vqa-3',
        sender: 'user',
        timestamp: '02:30 PM',
        query: 'இந்த அட்டையில் எத்தனை குடும்ப உறுப்பினர்கள் உள்ளனர்?',
        answerOriginal: 'இந்த குடும்ப அட்டையில் மொத்தம் 4 உறுப்பினர்கள் (2 பெரியவர்கள் மற்றும் 2 குழந்தைகள்) பதிவு செய்யப்பட்டுள்ளனர்.',
        answerEnglish: 'A total of 4 family members (2 adults and 2 children) are enrolled on this ration card.',
        evidenceQuote: 'உறுப்பினர்கள் எண்ணிக்கை: 4 (பெரியவர்கள்: 2, குழந்தைகள்: 2)',
        groundedBbox: { ymin: 400, xmin: 70, ymax: 445, xmax: 430 },
        confidenceScore: 99.2,
        tokensUsed: 135
      }
    ],
    suggestedQuestions: [
      'What is the commodity card type (PHH / NPHH / AAY)?',
      'What is the FPS shop code and zone for this ration card?',
      'மாதாந்திரமாக வழங்கப்படும் இலவச அரிசியின் அளவு என்ன?',
      'Who is named as the Head of Household?'
    ],
    stampsAndSignaturesCount: 2,
    processingTimeMs: 395
  },
  {
    id: 'doc-gazette-notification',
    title: 'भारत का राजपत्र (The Gazette of India - UGC Notification)',
    category: 'Government Gazette / Notice',
    language: 'Bilingual (Hindi/English)',
    pageCount: 1,
    fileSize: '540 KB',
    previewUrl: '/samples/gazette_india.svg',
    summary: {
      originalScriptSummary: [
        'मंत्रालय: शिक्षा मंत्रालय (उच्च शिक्षा विभाग), नई दिल्ली।',
        'अधिसूचना संख्या: राजपत्र असाधारण सं. UGC-SEC/2026/891, दिनांक: 04 मई 2026।',
        'विषय: राष्ट्रीय शिक्षा नीति के अंतर्गत भारतीय भाषाओं में तकनीकी पाठ्यक्रमों का कार्यान्वयन।',
        'हस्ताक्षरकर्ता: प्रो. रजनीश जैन, सचिव एवं मुख्य कार्यकारी अधिकारी, विश्वविद्यालय अनुदान आयोग।'
      ],
      englishSummary: [
        'Ministry: Ministry of Education (Department of Higher Education), New Delhi.',
        'Notification ID: Gazette Extraordinary No. UGC-SEC/2026/891, Date: 04 May 2026.',
        'Subject: Nationwide rollout of Technical & Professional Curriculum in Indian Languages.',
        'Signatory: Prof. Rajnish Jain, Secretary & CEO, University Grants Commission.'
      ],
      romanizedTransliteration: [
        'Bhaarat ka Raajpatra: Shiksha Mantralaya, Ucch Shiksha Vibhag.',
        'Adhisoochna: UGC-SEC/2026/891, Dinaank: 04 May 2026.',
        'Vishay: Bhaarateeya Bhaashaon mein Takneeki Pathyakram.'
      ],
      documentTypeDetected: 'Central Government Extraordinary Gazette Regulatory Order',
      primaryLanguage: 'Bilingual (Hindi/English)',
      scriptFamily: 'Latin / Bilingual',
      issuingAuthority: 'भारत सरकार मुद्रणालय (Government of India Press)',
      issueDate: '04-05-2026',
      referenceNumber: 'DL-(N)04/0007/2026-28'
    },
    fields: [
      {
        id: 'g1',
        keyOriginal: 'राजपत्र सं. (Gazette Reg. No.)',
        keyEnglish: 'Postal Gazette Registration Number',
        valueOriginal: 'DL-(N)04/0007/2026-28',
        valueEnglish: 'DL-(N)04/0007/2026-28',
        valueNormalized: 'DL-N04-0007',
        category: 'Identifier',
        confidence: 99.8,
        bbox: { ymin: 110, xmin: 650, ymax: 145, xmax: 920 }
      },
      {
        id: 'g2',
        keyOriginal: 'जारीकर्ता मंत्रालय (Ministry)',
        keyEnglish: 'Issuing Ministry',
        valueOriginal: 'शिक्षा मंत्रालय, उच्च शिक्षा विभाग (नई दिल्ली)',
        valueEnglish: 'Ministry of Education, Dept of Higher Education',
        valueNormalized: 'MoE Higher Education',
        category: 'Department & Authority',
        confidence: 99.2,
        bbox: { ymin: 220, xmin: 180, ymax: 270, xmax: 820 }
      },
      {
        id: 'g3',
        keyOriginal: 'अधिसूचना संदर्भ सं. (Ref No.)',
        keyEnglish: 'Statutory Order Reference Number',
        valueOriginal: 'UGC-SEC/2026/891',
        valueEnglish: 'UGC-SEC/2026/891',
        valueNormalized: 'UGC-SEC/2026/891',
        category: 'Identifier',
        confidence: 99.4,
        bbox: { ymin: 285, xmin: 80, ymax: 330, xmax: 360 }
      },
      {
        id: 'g4',
        keyOriginal: 'प्रकाशन तिथि (Date of Gazette)',
        keyEnglish: 'Publication Date',
        valueOriginal: 'नई दिल्ली, सोमवार, 4 मई, 2026 (वैशाख 14, 1948)',
        valueEnglish: 'New Delhi, Monday, May 4, 2026',
        valueNormalized: '2026-05-04',
        category: 'Date & Time',
        confidence: 98.7,
        bbox: { ymin: 285, xmin: 520, ymax: 330, xmax: 920 }
      },
      {
        id: 'g5',
        keyOriginal: 'हस्ताक्षरकर्ता एवं पदनाम (Signatory)',
        keyEnglish: 'Signatory Official',
        valueOriginal: 'डॉ. रजनीश जैन, सचिव (Secretary UGC)',
        valueEnglish: 'Dr. Rajnish Jain, Secretary UGC',
        valueNormalized: 'Rajnish Jain',
        category: 'Citizen Info',
        confidence: 98.5,
        bbox: { ymin: 650, xmin: 550, ymax: 710, xmax: 910 }
      }
    ],
    vqaHistory: [],
    suggestedQuestions: [
      'What is the gazette registration number and publication date?',
      'Which ministry and department issued this order?',
      'Who is the signing authority mentioned at the bottom?',
      'What core educational policy mandate is announced?'
    ],
    stampsAndSignaturesCount: 2,
    processingTimeMs: 440
  },
  {
    id: 'doc-marksheet-marathi',
    title: 'महाराष्ट्र राज्य परीक्षा मंडळ गुणपत्रिका (MSBSHSE Marksheet)',
    category: 'Academic Certificate / Marksheet',
    language: 'Bilingual (Marathi/English)',
    pageCount: 1,
    fileSize: '495 KB',
    previewUrl: '/samples/maharashtra_marksheet.svg',
    summary: {
      originalScriptSummary: [
        'परीक्षार्थी: अनिकेत मनोहर जोशी (Aniket Manohar Joshi), बैठक क्र: M-2026-88412.',
        'महाविद्यालय: फर्ग्युसन कनिष्ठ महाविद्यालय, पुणे (संकेतांक: 11.15.004).',
        'एकूण गुण: 542 / 600 (टक्केवारी: 90.33%), निकाल: प्रथम श्रेणी सह विशेष योग्यता (Distinction).',
        'गणित आणि भौतिकशास्त्र विषयात 95+ विशेष प्राविण्य प्राप्त.'
      ],
      englishSummary: [
        'Candidate: Aniket Manohar Joshi, Seat Number: M-2026-88412.',
        'Institution: Fergusson Junior College, Pune (Center Code: 11.15.004).',
        'Grand Total Marks: 542 / 600 (Percentage: 90.33%), Result: Distinction First Class.',
        'Subject distinctions earned in Mathematics (97) and Physics (94).'
      ],
      romanizedTransliteration: [
        'Pareeksharthee: Aniket Manohar Joshi, Baithak kramank: M-2026-88412.',
        'Mahaavidyalaya: Fergusson Junior College, Pune.',
        'Ekoon gun: 542 / 600, Nikaal: Pratham shreni sah vishesh yogyata.'
      ],
      documentTypeDetected: 'Higher Secondary Certificate Examination Statement of Marks',
      primaryLanguage: 'Bilingual (Marathi/English)',
      scriptFamily: 'Devanagari',
      issuingAuthority: 'महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ, पुणे',
      issueDate: '28-05-2026',
      referenceNumber: 'HSC-PUN-2026-091823'
    },
    fields: [
      {
        id: 'm1',
        keyOriginal: 'बैठक क्रमांक (Seat Number)',
        keyEnglish: 'Examination Seat Number',
        valueOriginal: 'M-2026-88412',
        valueEnglish: 'M-2026-88412',
        valueNormalized: 'M202688412',
        category: 'Identifier',
        confidence: 99.7,
        bbox: { ymin: 175, xmin: 80, ymax: 220, xmax: 340 }
      },
      {
        id: 'm2',
        keyOriginal: 'विद्यार्थ्याचे नाव (Candidate Name)',
        keyEnglish: 'Candidate Full Name',
        valueOriginal: 'अनिकेत मनोहर जोशी (Aniket Manohar Joshi)',
        valueEnglish: 'Aniket Manohar Joshi',
        valueNormalized: 'Aniket Manohar Joshi',
        category: 'Citizen Info',
        confidence: 99.1,
        bbox: { ymin: 230, xmin: 80, ymax: 275, xmax: 560 }
      },
      {
        id: 'm3',
        keyOriginal: 'महाविद्यालय / शाळा (Junior College)',
        keyEnglish: 'College / Institute Name',
        valueOriginal: 'फर्ग्युसन कनिष्ठ महाविद्यालय, पुणे',
        valueEnglish: 'Fergusson Junior College, Pune',
        valueNormalized: 'Fergusson College Pune',
        category: 'Department & Authority',
        confidence: 98.4,
        bbox: { ymin: 285, xmin: 80, ymax: 335, xmax: 580 }
      },
      {
        id: 'm4',
        keyOriginal: 'एकूण गुण (Total Marks Obtained)',
        keyEnglish: 'Aggregate Marks Obtained',
        valueOriginal: '542 / 600 (पाचशे बेचाळीस)',
        valueEnglish: '542 / 600',
        valueNormalized: '542',
        category: 'Technical / Usage',
        confidence: 99.4,
        bbox: { ymin: 440, xmin: 80, ymax: 490, xmax: 360 }
      },
      {
        id: 'm5',
        keyOriginal: 'टक्केवारी व निकाल (Percentage & Grade)',
        keyEnglish: 'Percentage and Final Division',
        valueOriginal: '90.33% - विशेष योग्यता सह प्रथम श्रेणी',
        valueEnglish: '90.33% - First Class with Distinction',
        valueNormalized: '90.33% Distinction',
        category: 'Technical / Usage',
        confidence: 99.0,
        bbox: { ymin: 440, xmin: 480, ymax: 490, xmax: 910 }
      }
    ],
    vqaHistory: [],
    suggestedQuestions: [
      'What is the student seat number and college name?',
      'विद्यार्थ्याला एकूण किती गुण आणि टक्केवारी मिळाली आहे?',
      'What final grade/division was awarded?',
      'Who is the issuing board or examination council?'
    ],
    stampsAndSignaturesCount: 3,
    processingTimeMs: 410
  }
];

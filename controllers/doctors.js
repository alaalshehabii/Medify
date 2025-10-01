// controllers/doctors.js — CRUD for doctors (ensures 6 cards on index)
const Doctor = require('../models/Doctor');

exports.index = async (_req, res) => {
  try {
    // Fetch up to 12, newest first
    const doctors = await Doctor.find().sort({ createdAt: -1 }).limit(12).lean();

    // Map DB docs to card shape and provide a default photo if missing
    const mapped = doctors.map(d => ({
      full_name: d.full_name || d.name || 'Doctor',
      specialty: d.specialty || 'Specialist',
      bio: d.bio || 'Caring, patient-first clinician.',
      photo: d.photo || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=60'
    }));

    // Fill with nice placeholders until we have 6
    const fillers = [
      { full_name: 'Dr. Sarah Lee',   specialty: 'Cardiology',   bio: 'Heart health & preventive care.',               photo: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=60' },
      { full_name: 'Dr. Mark Chen',   specialty: 'Neurology',    bio: 'Headaches, seizures & MS support.',            photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=60' },
      { full_name: 'Dr. Amina Saeed', specialty: 'Pediatrics',   bio: 'Gentle, family-first child care.',             photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=1200&q=60' },
      { full_name: 'Dr. Jack Simmons',specialty: 'Urology',      bio: 'Men’s health & minimally invasive care.',      photo: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1200&q=60' },
      { full_name: 'Dr. Carrie Lin',  specialty: 'Surgery',      bio: 'Patient-centered surgical care.',              photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=60' },
      { full_name: 'Dr. Karen Dawson',specialty: 'Dermatology',  bio: 'Skin, hair & nail health.',                    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=60' },
    ];

    const cards = [...mapped, ...fillers].slice(0, 6);

    res.render('doctors/index', { cards, doctors }); // pass both (cards used by view)
  } catch (err) {
    console.error('Doctors#index error:', err);
    res.status(500).render('doctors/index', { cards: [] , doctors: [] });
  }
};

// The rest CRUD stays the same:
exports.new = (_req, res) => res.render('doctors/new');

exports.create = async (req, res) => {
  try {
    const { full_name, specialty, license_number, email, phone, bio, photo } = req.body;
    await Doctor.create({ full_name, specialty, license_number, email, phone, bio, photo });
    res.redirect('/doctors');
  } catch (err) {
    console.error('Doctors#create error:', err);
    res.status(400).render('doctors/new', { error: 'Could not create doctor' });
  }
};

exports.show = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).lean();
    if (!doctor) return res.status(404).send('Not found');
    res.render('doctors/show', { doctor });
  } catch (err) {
    console.error('Doctors#show error:', err);
    res.status(500).send('Error');
  }
};

exports.edit = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).lean();
    if (!doctor) return res.status(404).send('Not found');
    res.render('doctors/edit', { doctor });
  } catch (err) {
    console.error('Doctors#edit error:', err);
    res.status(500).send('Error');
  }
};

exports.update = async (req, res) => {
  try {
    const { full_name, specialty, license_number, email, phone, bio, photo } = req.body;
    await Doctor.findByIdAndUpdate(
      req.params.id,
      { full_name, specialty, license_number, email, phone, bio, photo },
      { runValidators: true }
    );
    res.redirect(`/doctors/${req.params.id}`);
  } catch (err) {
    console.error('Doctors#update error:', err);
    res.status(400).send('Update failed');
  }
};

exports.destroy = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.redirect('/doctors');
  } catch (err) {
    console.error('Doctors#destroy error:', err);
    res.status(500).send('Delete failed');
  }
};
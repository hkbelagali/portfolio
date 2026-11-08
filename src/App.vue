<script setup lang="ts">
import { ref } from 'vue'
import profilePhoto from './assets/profile.jpg'
import simulationVideo from './assets/movie.mp4'
import gatesetRotationFigure from './assets/gatesetrotation.png'
import SocialIcon from './components/SocialIcon.vue'
import CvViewer from './components/CvViewer.vue'

const profileLinks = [
  {
    name: 'scholar',
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=Bp2oB5IAAAAJ',
  },
  { name: 'email', label: 'Email', href: 'mailto:belagal1@msu.edu' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/hkbel' },
  { name: 'orcid', label: 'ORCID', href: 'https://orcid.org/0009-0004-2690-6908' },
  { name: 'github', label: 'GitHub', href: 'https://github.com/hkbelagali' },
] as const

const cvViewer = ref<InstanceType<typeof CvViewer> | null>(null)
const commitDate = import.meta.env.VITE_LAST_COMMIT_DATE
const lastUpdated = commitDate
  ? new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${commitDate}T00:00:00Z`))
  : null

const publications = [
  {
    title: 'Efficient classical simulation of large-scale unitary cluster Jastrow circuits',
    authors:
      'Hrishikesh Belagali, Thomas Van Camp, R. Pradeep, Sourin Das, Namit Anand, Ryan LaRose',
    href: 'https://arxiv.org/abs/2607.21337',
    reference: 'arXiv:2607.21337 · 2026',
    status: 'Submitted to Physical Review Letters; revised manuscript under review.',
  },
  {
    title: 'Propaq: A Python package for Heisenberg propagation',
    authors: 'Hrishikesh Belagali, Ryan LaRose',
    href: 'https://arxiv.org/abs/2609.07730',
    reference: 'arXiv:2609.07730 · 2026',
    status: 'Submitted to ACM Transactions on Software Engineering and Methodology.',
  },
  {
    title:
      'The Nanoscale Impact of Cyclopropane Fatty Acids and Hopanoids on Alcohol Tolerance in Clostridium acetobutylicum and Zymomonas mobilis',
    authors: 'Hrishikesh Belagali, Nitin Kumar Singh, Josh V. Vermaas',
    href: 'https://chemrxiv.org/doi/full/10.26434/chemrxiv.15004463/v1',
    reference: 'ChemRxiv · 2026',
    status: 'Submitted to The Journal of Physical Chemistry B; under revision.',
  },
]

const software = [
  {
    name: 'propaq',
    role: 'Creator & primary developer',
    languages: 'Python · Rust',
    description:
      'A customizable Heisenberg propagation package for large-scale quantum circuit simulation. Rust kernels and Python bindings support Pauli and Majorana propagation, with plugins for custom noise and truncation policies.',
    href: 'https://hkbelagali.github.io/propaq/',
  },
  {
    name: 'ffsim',
    role: 'Contributor',
    languages: 'Python · Rust',
    description:
      'Implemented fermionic backpropagation from "Efficient classical simulation of large-scale unitary cluster Jastrow circuits" for fast unitary cluster Jastrow simulation, with a JAX implementation for GPU-accelerated variational optimization.',
    href: 'https://github.com/qiskit-community/ffsim/releases/tag/v0.0.85',
  },
  {
    name: 'QuTiP',
    role: 'Contributor',
    languages: 'Python',
    description:
      'Added functionality to return eigenkets as an operator in the Qobj class of the Quantum Toolbox in Python.',
    href: 'https://github.com/qutip/qutip',
  },
  {
    name: 'tce-lib',
    role: 'Contributor',
    languages: 'Python',
    description:
      'Implemented lazy evaluation of Monte Carlo trajectories for efficient simulation on HPC clusters in this tensor cluster expansion library.',
    href: 'https://github.com/MUEXLY/tce-lib',
  },
]
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="navigation page-width" aria-label="Main navigation">
      <p v-if="lastUpdated" class="last-updated">
        Last updated <time :datetime="commitDate">{{ lastUpdated }}</time>
      </p>
      <p v-else class="last-updated">Last updated date unavailable</p>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#research">Research</a>
        <a href="#publications">Publications</a>
        <a href="#software">Software</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  </header>

  <main id="main" class="page-width" tabindex="-1">
    <section id="about" class="intro" aria-labelledby="intro-title">
      <div class="intro-copy">
        <h1 id="intro-title">Hi, I'm Hrishi!</h1>

        <p>
          I'm a computer science undergraduate at Michigan State University. At
          <a href="https://msu-q.msu.edu/">MSU-Q</a>, I work with Professor Ryan LaRose on topics
          spanning quantum algorithms for quantum chemistry, Hamiltonian simulation, fault-tolerant
          quantum compilation, and the classical simulation of quantum circuits. I also study
          biomolecular systems using molecular dynamics (MD) in the
          <a href="https://vermaaslab.github.io/">Vermaas Lab</a> at the MSU-DOE Plant Research
          Laboratory. Having explored classical and quantum approaches to molecular modeling
          independently, I am interested in exploring techniques at the intersection of these
          computational paradigms during my graduate studies.
        </p>
        <p>
          <strong
            >I'm applying to PhD programs for Fall 2027, broadly focused on quantum algorithms for
            simulation and electronic structure problems, quantum error correction, and
            fault-tolerant quantum compilation.</strong
          >
        </p>
      </div>
      <figure class="portrait">
        <img
          :src="profilePhoto"
          alt="Hrishikesh Belagali"
          width="300"
          height="360"
          fetchpriority="high"
        />
        <figcaption>Michigan State University · East Lansing</figcaption>
      </figure>
      <div class="intro-links">
        <button class="text-link" type="button" @click="cvViewer?.open()">View CV</button>
      </div>
      <div class="social-links" role="group" aria-label="Academic and social profiles">
        <a
          v-for="profile in profileLinks"
          :key="profile.name"
          :href="profile.href"
          :aria-label="profile.label"
          :title="profile.label"
        >
          <SocialIcon :name="profile.name" />
        </a>
      </div>
      <div class="education">
        <span class="eyebrow">Education</span>
        <div>
          <h2>B.S. in Computer Science</h2>
          <p>Michigan State University · Honors College<br />2024–2027 (expected) · GPA: 4.0</p>
        </div>
      </div>
    </section>

    <section id="research" class="section" aria-labelledby="research-title">
      <div class="section-heading">
        <span class="section-number" aria-hidden="true">01</span>
        <h2 id="research-title">Research</h2>
      </div>
      <aside class="research-note">
        <p class="eyebrow">Research interests</p>
        <p>
          Hybrid quantum-classical algorithms for molecular simulation · Hamiltonian simulation
          methods · Fault-tolerant compiling · Quantum error correction
        </p>
      </aside>
      <p class="section-lead">
        Broadly, my research spans various techniques across quantum and classical computing for
        simulating physical systems.
      </p>
      <article class="research-entry">
        <div class="entry-meta">
          <p>2026–present</p>
          <p>MSU-Q</p>
        </div>
        <div>
          <h3>Efficient classical simulation of large-scale unitary cluster Jastrow circuits</h3>
          <p class="role">Undergraduate Research Assistant</p>
          <p>
            Recent quantum-computing experiments have used the unitary cluster Jastrow (UCJ) ansatz
            for ground-state energy calculations. I contributed to the development of a
            polynomial-time classical simulation algorithm for single-layer UCJ circuits. My role
            involved contributing to the theoretical development of the algorithm, implementing it
            on GPUs, and comparing its performance to existing methods such as Pauli/Majorana
            propagation. Using this algorithm, our team was able to simulate a 77-qubit, 3,500
            two-qubit gate UCJ circuit in under a minute on a laptop, and in a tenth of a second on
            a GPU.
          </p>
          <p>
            My work on this project and its implications were highlighted in
            <a
              href="https://engineering.msu.edu/news/student-view-challenging-quantum-advantage-boundary"
              >an article by the MSU College of Engineering</a
            >. I am involved in follow-up work to extend this algorithm to larger molecular systems
            using selected configuration interaction (SCI) techniques.
          </p>
        </div>
      </article>
      <article class="research-entry">
        <div class="entry-meta">
          <p>2025–2026</p>
          <p>MSU Honors College / MSU-Q</p>
        </div>
        <div>
          <h3>Reducing Fault-Tolerant Compilation Costs via Gateset Rotation</h3>
          <p class="role">Honors Research Scholar</p>
          <p>
            The Clifford+T gateset is a promising gateset for fault-tolerant quantum computing,
            particularly due to the mathematical properties of the Clifford group, established
            protocols for T-gate magic-state distillation, and error correction codes that implement
            Clifford gates transversally. However, preparing each T gate incurs significant overhead
            for certain quantum algorithms, and reducing T-count is a key aim in fault-tolerant
            compilation. I developed a gateset-rotation algorithm to find basis transformations that
            reduce the T-counts of quantum circuits, while preserving the fault-tolerant properties
            of the Clifford+T gateset. I applied this algorithm to various approaches to Hamiltonian
            simulation and presented this work at
            <a href="https://uuraf.msu.edu/uuraf">MSU's University Undergraduate Research and Arts Forum (UURAF)</a>,
            where I was awarded first place in the Engineering, Computer Science, and Mathematics
            division.
          </p>
          <figure class="research-figure">
            <a
              :href="gatesetRotationFigure"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the gateset rotation figure at full size"
            >
              <img
                :src="gatesetRotationFigure"
                alt="Two Bloch spheres showing the original coordinate axes and rotated axes, with the new z-axis aligned to the quantum state."
                width="1571"
                height="601"
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption>
              Gateset rotation illustrated as a change of basis on the Bloch sphere.
            </figcaption>
          </figure>
        </div>
      </article>
      <article class="research-entry">
        <div class="entry-meta">
          <p>2024–present</p>
          <p>Vermaas Lab<br />Plant Research Laboratory</p>
        </div>
        <div>
          <h3>Studying biomolecular systems via molecular dynamics</h3>
          <p class="role">Undergraduate Research Assistant</p>
          <p>
            Over the last two years, I have contributed to several projects using molecular dynamics
            (MD) to study membrane-protein dynamics. I studied the effect of the PDLP5 cap on
            aquaporin function (shown below!), a key regulator of plant water transport that is
            difficult to observe experimentally. My work involves running large-scale MD simulations
            on high-performance computing clusters, often demanding thousands of GPU hours and
            producing terabytes of data, and developing data analysis pipelines to extract
            meaningful insights from these trajectories.
          </p>
          <p>
            More recently, I have been exploring the mechanisms behind alcohol tolerance in
            bacteria. A major obstacle to scalable biofuel production is the toxicity of biofuels
            (which are often alcohols) to the bacteria that produce them, and understanding the
            mechanisms responsible for alcohol tolerance is crucial to overcoming this challenge.
            Using
            <strong>in silico</strong> methods, I investigated how varying membrane compositions
            influence bacterial alcohol tolerance and identified key membrane components responsible
            for modulating membrane dynamics in the presence of alcohols.
          </p>
          <figure class="simulation">
            <video
              width="1000"
              height="1000"
              controls
              autoplay
              loop
              muted
              playsinline
              preload="metadata"
              aria-label="Molecular dynamics simulation of a capped aquaporin in a membrane"
            >
              <source :src="simulationVideo" type="video/mp4" />
              Your browser does not support embedded video.
              <a :href="simulationVideo">Download the simulation.</a>
            </video>
            <figcaption>
              A PDLP5 protein cap (green) on top of a PIP1;4 aquaporin water channel (orange)
              embedded in a membrane.
            </figcaption>
          </figure>
        </div>
      </article>
    </section>

    <section id="publications" class="section" aria-labelledby="publications-title">
      <div class="section-heading">
        <span class="section-number" aria-hidden="true">02</span>
        <h2 id="publications-title">Publications</h2>
      </div>
      <p class="section-lead">
        Preprints and manuscripts.
      </p>
      <ol class="publications-list">
        <li v-for="paper in publications" :key="paper.href">
          <p class="eyebrow">{{ paper.reference }}</p>
          <h3>
            <a :href="paper.href">{{ paper.title }} <span aria-hidden="true">↗</span></a>
          </h3>
          <p class="authors">{{ paper.authors }}</p>
          <p class="publication-status">{{ paper.status }}</p>
        </li>
      </ol>
    </section>

    <section id="software" class="section" aria-labelledby="software-title">
      <div class="section-heading">
        <span class="section-number" aria-hidden="true">03</span>
        <h2 id="software-title">Research software</h2>
      </div>
      <p class="section-lead">Open-source tools I build and contribute to.</p>
      <div class="software-list">
        <article v-for="project in software" :key="project.name" class="software-entry">
          <div>
            <h3>
              <a :href="project.href">{{ project.name }} <span aria-hidden="true">↗</span></a>
            </h3>
            <p class="entry-meta">{{ project.languages }}</p>
          </div>
          <div>
            <p class="role">{{ project.role }}</p>
            <p>{{ project.description }}</p>
          </div>
        </article>
      </div>
      <div class="highlights">
        <div>
          <h3>Selected recognition</h3>
          <ul class="plain-list">
            <li>
              <strong
                >First place, <a href="https://uuraf.msu.edu/uuraf">MSU UURAF</a> · 2026</strong
              ><br />Engineering, Computer Science and Mathematics division, for work on reducing T
              gate counts via gateset rotation.
            </li>
            <li>
              <strong>Wielenga Research Scholarship · 2025–2026</strong><br />Michigan State
              University Honors College.
            </li>
          </ul>
        </div>
        <div>
          <h3>Presentations & writing</h3>
          <p>
            Presented research at MQC Entanglement,
            <a href="https://uuraf.msu.edu/uuraf">MSU UURAF</a>, ACS Fall, and the GLBRC Annual
            Science Meeting in 2026.
          </p>
          <p>
            <a
              href="https://engineering.msu.edu/news/student-view-challenging-quantum-advantage-boundary"
              >Student View: Challenging the Quantum Advantage Boundary
              <span aria-hidden="true">↗</span></a
            ><br /><span class="entry-meta">MSU College of Engineering · 2026</span>
          </p>
        </div>
      </div>
    </section>

    <section id="contact" class="section contact" aria-labelledby="contact-title">
      <div class="section-heading">
        <span class="section-number" aria-hidden="true">04</span>
        <h2 id="contact-title">Get in touch</h2>
      </div>
      <a class="contact-email" href="mailto:belagal1@msu.edu"
        >belagal1@msu.edu <span aria-hidden="true">↗</span></a
      >
      <div class="inline-links">
        <a href="https://github.com/hkbelagali">GitHub <span aria-hidden="true">↗</span></a>
        <a href="https://www.linkedin.com/in/hkbel">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href="https://scholar.google.com/citations?user=Bp2oB5IAAAAJ"
          >Google Scholar <span aria-hidden="true">↗</span></a
        >
        <button class="text-link" type="button" @click="cvViewer?.open()">View CV</button>
      </div>
    </section>
  </main>
  <CvViewer ref="cvViewer" />

  <footer class="page-width site-footer">
    <p>Hrishikesh Belagali</p>
    <a href="#about">Back to top ↑</a>
  </footer>
</template>

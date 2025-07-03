const courseData = {
    // First Year Courses
    "BT-101": {
      name: "Engineering Chemistry",
      units: [
        {
          title: "Unit 1",
          description:
            "Water – Analysis, Treatments and Industrial Applications. Includes sources, impurities, hardness and its determination, alkalinity and numerical problems."
        },
        {
          title: "Unit 2",
          description:
            "Boiler problems and softening methods. Covers sludge, scale, priming, foaming, boiler corrosion, caustic embrittlement, and softening techniques like Lime-Soda, Zeolite, and Ion Exchange."
        },
        {
          title: "Unit 3",
          description:
            "Lubricants and Lubrication. Topics include lubrication mechanisms, types, viscosity, flash & fire points, acid number, and related measurements."
        },
        {
          title: "Unit 4",
          description:
            "Polymers and polymerization. Includes types, mechanisms, classification, thermoplastics and thermosets, biodegradable polymers, and preparation of industrial polymers like PVC, Teflon, Nylon, etc."
        },
        {
          title: "Unit 5",
          description:
            "Phase equilibrium and corrosion. Covers water and Cu-Ag phase diagrams, types and mechanisms of corrosion and their prevention."
        },
        {
          title: "Unit 6",
          description:
            "Spectroscopic techniques and periodic properties. Includes spectroscopy principles, vibrational/rotational spectroscopy, and periodic trends like effective nuclear charge, orbital energies, and electron affinity."
        }
      ]
    },
    "BT-102": {
      name: "Mathematics-I",
      units: [
        {
          title: "Unit 1",
          description:
            "Calculus – Rolle’s theorem, Mean Value theorems, function expansions, partial derivatives, maxima & minima, Lagrange multipliers."
        },
        {
          title: "Unit 2",
          description:
            "Definite integrals and applications – Beta & Gamma functions, surface/volume calculations, multiple integrals and order change."
        },
        {
          title: "Unit 3",
          description:
            "Sequences and series – convergence tests, power and Taylor series, exponential/trigonometric/logarithmic series, Fourier series and Parseval’s theorem."
        },
        {
          title: "Unit 4",
          description:
            "Vector spaces – subspaces, linear combinations, independence, basis, and linear transformations."
        },
        {
          title: "Unit 5",
          description:
            "Matrices – rank, linear system solutions, eigenvalues/vectors, diagonalization, and Cayley-Hamilton theorem with inverse calculation."
        }
      ]
    },
    "BT-103": {
      name: "English for Communication",
      units: [
        {
          title: "Unit 1",
          description:
            "Grammar fundamentals – articles, subject-verb agreement, prepositions, voice, reported speech, and sentence structure."
        },
        {
          title: "Unit 2",
          description:
            "Vocabulary and comprehension – use of prefixes/suffixes, synonyms, antonyms, and reading comprehension."
        },
        {
          title: "Unit 3",
          description:
            "Communication fundamentals – types, process, oral vs written, barriers, 7Cs, nonverbal communication, importance in technical fields."
        },
        {
          title: "Unit 4",
          description:
            "Writing skills – planning, drafting, editing, précis writing, technical descriptions and reports (trouble, lab, progress)."
        },
        {
          title: "Unit 5",
          description:
            "Business correspondence – business letters, resume writing, quotation/order/complaint/tender emails and formats."
        }
      ]
    },
    "BT-104": {
      name: "Basic Electrical & Electronics Engineering",
      units: [
        {
          title: "Unit 1",
          description:
            "DC circuits – Ohm’s law, Kirchhoff’s laws, mesh and nodal analysis, series and parallel resistances, power calculation."
        },
        {
          title: "Unit 2",
          description:
            "AC fundamentals – generation, waveform, RMS and average values, phase and phasor diagrams, power factor and its correction."
        },
        {
          title: "Unit 3",
          description:
            "Transformers – construction, working, EMF equation, types, efficiency, and losses."
        },
        {
          title: "Unit 4",
          description:
            "Motors – DC and induction motors: construction, principle, classification and applications."
        },
        {
          title: "Unit 5",
          description:
            "Semiconductor devices – diode, BJT, LED, and basic circuits. Number systems and Boolean algebra."
        }
      ]
    },
    "BT-105": {
      name: "Engineering Graphics",
      units: [
        {
          title: "Unit 1",
          description:
            "Graphics principles – drawing instruments, types of lines, lettering, dimensioning, scales, and layout."
        },
        {
          title: "Unit 2",
          description:
            "Geometrical constructions, tangents, bisectors, regular polygons using general methods."
        },
        {
          title: "Unit 3",
          description:
            "Orthographic projections – 1st and 3rd angle, missing views, sectional views, conventions, and visualization."
        },
        {
          title: "Unit 4",
          description:
            "Isometric projection – principles, isometric scale, drawing isometric views from orthographic projections."
        },
        {
          title: "Unit 5",
          description:
            "Development of surfaces – prisms, pyramids, cylinders, cones; Intersection of solids and sections."
        }
      ]
    },
    "BT-106": {
      name: "Workshop Practice",
      units: [
        {
          title: "Unit 1",
          description:
            "Introduction to workshop and safety practices, hand tools and their uses, measuring instruments and basic operations."
        },
        {
          title: "Unit 2",
          description:
            "Carpentry – tools, materials, types of joints, practices like half-lap, dovetail, mortise & tenon joints."
        },
        {
          title: "Unit 3",
          description:
            "Fitting – tools and operations like marking, cutting, filing, drilling, tapping; fitting practice jobs."
        },
        {
          title: "Unit 4",
          description:
            "Welding – arc and gas welding, tools, types of joints, safety precautions and practice."
        },
        {
          title: "Unit 5",
          description:
            "Sheet metal – tools and operations, fabrication of simple articles; Black smithy – tools and forging operations."
        }
      ]
    },
    "BT-107": {
      name: "Internship-1",
      units: [
        {
          title: "Unit 1",
          description:  "Internship in a relevant field to gain practical experience and apply theoretical knowledge in real-world scenarios."

        },
        {
          title: "Unit 2",
          description:  "Internship in a relevant field to gain practical experience and apply theoretical knowledge in real-world scenarios."

        },
        {
          title: "Unit 3",
          description:
            "Documentation and presentation of internship experience, including challenges faced and solutions implemented."},
        {
          title: "Unit 4",
          description:
            "Reflection on learning outcomes, skills acquired, and how the internship has influenced career goals."},
        {
          title: "Unit 5",
          description:
          "Reflection on learning outcomes, skills acquired, and how the internship has influenced career goals."
        }
      ]
    },

    // Second Year Courses
     "BT-201": {
        name: "Engineering Physics",
        units: [
          {
            title: "Unit 1",
            description: "Interference and Diffraction: Interference by division of wave front, Interference by division of amplitude, Thin film interference, Newton’s ring, Diffraction: Single slit, Double slit, Diffraction grating, Resolving power of grating, Rayleigh’s criterion."
          },
          {
            title: "Unit 2",
            description: "Polarization and Laser: Polarization by reflection, refraction, double refraction and scattering, Malus law, Brewster’s law, Nicol prism, Retardation plates, Optical rotation and polarimeter. Laser: Spontaneous and stimulated emission, Einstein’s coefficients, Population inversion, Ruby and He-Ne lasers."
          },
          {
            title: "Unit 3",
            description: "Quantum Physics and Applications: Black body radiation, Planck’s law, Photoelectric effect, Compton effect, De-Broglie hypothesis, Heisenberg uncertainty principle, Schrödinger wave equation, Particle in one dimensional box and its applications in nanotechnology."
          },
          {
            title: "Unit 4",
            description: "Nuclear Physics: Binding energy, Nuclear fission and fusion, Nuclear reactors, Nuclear models, Radiation detectors, Particle accelerators (Cyclotron and Betatron)."
          },
          {
            title: "Unit 5",
            description: "Solid State Physics: Crystal structure, X-ray diffraction, Bonding in solids, Free electron theory of metals, Band theory of solids, Superconductivity, Magnetic and dielectric properties of materials."
          }
        ]
      },
      "BT-202": {
        name: "Mathematics-II",
        units: [
          {
            title: "Unit 1",
            description: "Laplace Transforms: Definition, Laplace transform of standard functions, Properties of Laplace transform, Unit step function, Dirac-delta function, Periodic function, Inverse Laplace transforms, Convolution theorem, Applications to solve ordinary differential equations."
          },
          {
            title: "Unit 2",
            description: "Fourier Series and Fourier Transforms: Periodic functions, Fourier series expansion, Half range sine and cosine series, Fourier integrals, Fourier transforms, Fourier sine and cosine transforms, Properties and applications."
          },
          {
            title: "Unit 3",
            description: "Partial Differential Equations: Formation and solution of partial differential equations, Lagrange’s linear equation, Charpit’s method, Method of separation of variables, Heat equation, Wave equation, Laplace equation and their solutions."
          },
          {
            title: "Unit 4",
            description: "Numerical Methods: Solution of algebraic and transcendental equations, Bisection method, Regula-falsi method, Newton-Raphson method, Solution of linear system of equations, Gauss elimination, Gauss-Seidel method, Interpolation, Newton’s and Lagrange’s interpolation formulas."
          },
          {
            title: "Unit 5",
            description: "Numerical Integration and Differentiation: Trapezoidal rule, Simpson’s 1/3 and 3/8 rules, Numerical solution of ordinary differential equations, Euler’s method, Modified Euler’s method, Runge-Kutta method."
          }
        ]
      },
      "BT-203": {
      name: "Basic Mechanical Engineering",
      units: [
        {
          title: "Unit 1",
          description: "Laws of thermodynamics, Basic terms and definitions, Zeroth law, First law and its applications, Second law, Carnot cycle, Heat engines and pumps, Efficiency and COP, Entropy and enthalpy."
        },
        {
          title: "Unit 2",
          description: "IC Engines: Classification and working of IC engines (SI and CI), Four stroke and two stroke engines, Otto, Diesel and dual cycles, Indicated and brake power, Mechanical efficiency, Air standard cycles."
        },
        {
          title: "Unit 3",
          description: "Properties of steam and boilers: Phase transformation, Dryness fraction, Use of steam tables, Rankine cycle, Classification and working of boilers, Babcock and Wilcox boiler, Cochran boiler, Mountings and accessories."
        },
        {
          title: "Unit 4",
          description: "Refrigeration and Air Conditioning: Units, COP, Principle and working of refrigerator and air conditioner, Vapour compression and absorption refrigeration systems, Psychrometry, Comfort air conditioning."
        },
        {
          title: "Unit 5",
          description: "Simple stress and strain: Stress-strain diagram, Elastic constants, Hooke’s law, Poisson’s ratio, Thermal stress, Axial loading of bars, Strain energy and resilience, Compound bars, Deformations."
        }
      ]
      },
     "BT-204": {
      name: "Basic Civil Engineering & Mechanics",
      units: [
        {
          title: "Unit 1",
          description:
            "Buildings: Types, Components, and Site selection. Building materials: properties and uses of common materials (stone, brick, timber, cement, sand, aggregates, lime, steel)."
        },
        {
          title: "Unit 2",
          description:
            "Surveying and leveling – Principles, instruments, measurements using tape, chain, compass, and level; Introduction to digital instruments."
        },
        {
          title: "Unit 3",
          description:
            "Transportation – Roads, Railways, Bridges, Dams, and Airports: classification, components, and introduction to construction techniques."
        },
        {
          title: "Unit 4",
          description:
            "Simple stresses and strains – Hooke’s law, stress-strain diagrams, factor of safety, types of elasticity, and Poisson’s ratio."
        },
        {
          title: "Unit 5",
          description:
            "Center of gravity and moment of inertia: Determination for regular sections, parallel and perpendicular axis theorem, concept of centroid."
        },
        {
          title: "Unit 6",
          description:
            "Friction – laws, equilibrium on horizontal/ inclined planes. Beams – types, shear force and bending moment diagrams for simple load cases."
        }
      ]
      }, 
      "BT-205": {
          "name": "Basic Computer Engineering",
          "units": [
            {
              "title": "Unit 1",
              "description": "Basics of computers, components, software types, and applications in fields like e-Business, healthcare, GIS, and multimedia. Overview of OS, MS Word, Excel, and PowerPoint."
            },
            {
              "title": "Unit 2",
              "description": "Introduction to algorithms, flowcharts, and programming basics. Overview of OOP vs POP, C++ structure, data types, operators, control structures, arrays, and functions."
            },
            {
              "title": "Unit 3",
              "description": "OOP concepts in C++: classes, objects, constructors, destructors, inheritance, polymorphism, overloading, and an introduction to data structures."
            },
            {
              "title": "Unit 4",
              "description": "Networking basics, OSI & TCP/IP models, internet, and e-commerce. Cybersecurity threats, attacks, prevention, ethics, and an intro to cyber laws."
            },
            {
              "title": "Unit 5",
              "description": "DBMS basics, data models, architecture, keys, DDL & DML. Introduction to cloud computing: services (IaaS, PaaS, SaaS), deployment models, pros and cons."
            }
          ]
       },
      
    "ES-301": {
      name: "Energy & Environmental Engineering",
      units: [
        {
          title: "Module 1: Introduction to Energy Science",
          description: "Energy systems, resources, sustainability; Fossil fuels and alternatives; Energy storage possibilities"
        },
        {
          title: "Module 2: Ecosystems",
          description: "Ecosystem structure and function; Energy flow; Food chains and webs; Types of ecosystems"
        },
        {
          title: "Module 3: Biodiversity and its conservation",
          description: "Biodiversity types and value; India's biodiversity; Conservation methods"
        },
        {
          title: "Module 4: Environmental Pollution",
          description: "Types, causes and control of pollution; Solid waste management; Disaster management"
        },
        {
          title: "Module 5: Social Issues and the Environment",
          description: "Sustainable development; Water conservation; Environmental ethics; Climate change; Environmental legislation"
        },
        {
          title: "Module 6: Field work",
          description: "Field visits to document environmental assets and polluted sites; Ecosystem studies"
        }
      ]
    },
    "CS-302": {
      name: "Discrete Structure",
      units: [
        {
          title: "Set Theory, Relation, Function, Theorem Proving Techniques",
          description: "Sets; Relations; Functions; Mathematical induction; Proof by contradiction"
        },
        {
          title: "Algebraic Structures",
          description: "Groups; Monoids; Rings and Fields; Homomorphism and isomorphism"
        },
        {
          title: "Propositional Logic",
          description: "Logic operations; Truth tables; Normal forms; Quantifiers"
        },
        {
          title: "Introduction to finite state machine",
          description: "FSMs as models of physical systems; FSMs as language recognizers"
        },
        {
          title: "Graph Theory",
          description: "Graph terminology; Paths and cycles; Eulerian and Hamiltonian paths; Graph coloring"
        },
        {
          title: "Posets, Hasse Diagram and Lattices",
          description: "Ordered sets; Hasse diagrams; Properties of lattices"
        },
        {
          title: "Combinatorics and Recurrence Relation",
          description: "Permutation and combination; Recurrence relations; Generating functions"
        }
      ]
    },
    "CS-303": {
      name: "Data Structure",
      units: [
        {
          title: "Introduction to Data Structure",
          description: "Data structures concepts; Arrays and linked lists implementations"
        },
        {
          title: "Stacks and Queues",
          description: "Stack implementations and applications; Queue types and applications"
        },
        {
          title: "Tree",
          description: "Binary search trees; AVL trees; B-trees; Tree traversals"
        },
        {
          title: "Graphs",
          description: "Graph types and representations; Traversal algorithms; Spanning tree algorithms"
        },
        {
          title: "Sorting and Searching",
          description: "Sorting techniques; Search algorithms; Hashing and indexing"
        }
      ]
    },
    "CS-304": {
      name: "Digital Systems",
      units: [
        {
          title: "Unit 1",
          description: "Number systems; Boolean algebra; Logic gates; K-maps; Function simplification"
        },
        {
          title: "Unit 2: Combinational Logic",
          description: "Adders; Subtractors; MUX/DEMUX; Encoders/Decoders; ALU"
        },
        {
          title: "Unit 3: Sequential logic",
          description: "Flip-flops; Registers; Counters; Semiconductor memories; ROM and PLA"
        },
        {
          title: "Unit 4",
          description: "AD/DA converters; Multivibrators; IC 555; Logic families; Interfacing"
        },
        {
          title: "Unit 5: Introduction to Digital Communication",
          description: "Sampling theorem; Multiplexing; Modulation schemes; Channel capacity"
        }
      ]
    },
    "CS-305": {
      name: "Object Oriented Programming & Methodology",
      units: [
        {
          title: "Introduction to Object Oriented Thinking & Object Oriented Programming",
          description: "OOP vs procedural; Object-oriented paradigm features; Elements of OOPS"
        },
        {
          title: "Encapsulation and Data Abstraction",
          description: "Objects and their properties; Classes; Access modifiers; Construction/destruction"
        },
        {
          title: "Relationships",
          description: "Inheritance types; Association; Aggregation; Interfaces; Abstract classes"
        },
        {
          title: "Polymorphism",
          description: "Method overriding and overloading; Static and runtime polymorphism"
        },
        {
          title: "Advanced Concepts",
          description: "Strings; Exception handling; Multi-threading; Data collections; Case studies"
        }
      ]
    },
    "BT-401": {
      name: "Mathematics-III",
      units: [
        {
          title: "Module 1: Numerical Methods - 1",
          description: "Solutions of equations; Finite differences; Interpolation methods"
        },
        {
          title: "Module 2: Numerical Methods - 2",
          description: "Numerical differentiation and integration; Linear algebraic equations methods"
        },
        {
          title: "Module 3: Numerical Methods - 3",
          description: "ODE solutions; PDE solutions; Finite difference methods"
        },
        {
          title: "Module 4: Transform Calculus",
          description: "Laplace transform; Inverse transforms; Convolution theorem; Fourier transforms"
        },
        {
          title: "Module 5: Concept of Probability",
          description: "Probability functions; Discrete and continuous distributions"
        }
      ]
    },
    "CS-402": {
      name: "Analysis Design of Algorithm",
      units: [
        {
          title: "Unit 1",
          description: "Algorithm basics; Asymptotic notations; Divide and conquer techniques"
        },
        {
          title: "Unit 2",
          description: "Greedy strategy; Optimal merge patterns; Huffman coding; Spanning trees"
        },
        {
          title: "Unit 3",
          description: "Dynamic programming; Knapsack problem; Multistage graph; Floyd-Warshall algorithm"
        },
        {
          title: "Unit 4",
          description: "Backtracking; Branch & bound method; Lower bound theory"
        },
        {
          title: "Unit 5",
          description: "Tree types; Search techniques; NP-completeness"
        }
      ]
    },
    "CS-403": {
      name: "Software Engineering",
      units: [
        {
          title: "Unit I: The Software Product and Software Process",
          description: "Software characteristics; Process models; Process customization; CMM; Metrics"
        },
        {
          title: "Unit II: Requirement Elicitation, Analysis, and Specification",
          description: "Requirement types; Elicitation techniques; Analysis modeling; Use cases; Validation"
        },
        {
          title: "Unit III: Software Design",
          description: "Design concepts; UML; Architectural design; UI design; Component design"
        },
        {
          title: "Unit IV: Software Analysis and Testing",
          description: "Static/dynamic analysis; Test process; Test techniques; Test plan; Test metrics"
        },
        {
          title: "Unit V: Software Maintenance & Software Project Measurement",
          description: "Maintenance types; Configuration management; Re-engineering; Project planning; Risk assessment"
        }
      ]
    },
    "CS-404": {
      name: "Computer Org. & Architecture",
      units: [
        {
          title: "Basic Structure of Computer",
          description: "CPU organization; Registers; Instruction formats; ALU; Bus structures; Addressing modes"
        },
        {
          title: "Control Unit Organization",
          description: "Instruction types; Micro-instructions; Control units; Fetch and execution cycles"
        },
        {
          title: "Computer Arithmetic",
          description: "Addition/subtraction operations; Multiplication/division; Floating point arithmetic"
        },
        {
          title: "I/O Organization",
          description: "I/O interfaces; Data transfer modes; DMA; I/O processors"
        },
        {
          title: "Memory Organization",
          description: "Memory types; Cache memory; Virtual memory; Memory management"
        },
        {
          title: "Multiprocessors",
          description: "Multiprocessor structure; Pipelining; Vector processing; RISC and CISC"
        }
      ]
    },
    "CS-405": {
      name: "Operating Systems",
      units: [
        {
          title: "UNIT 1: Introduction to Operating Systems",
          description: "OS functions; Types; Services; System calls"
        },
        {
          title: "UNIT 2: File Systems",
          description: "File concepts; Directory structures; Allocation methods; Disk scheduling"
        },
        {
          title: "UNIT 3: CPU Scheduling and Memory Management",
          description: "Process concepts; Scheduling algorithms; Memory management techniques; Virtual memory"
        },
        {
          title: "UNIT 4: Input/Output and Concurrent Processes",
          description: "I/O principles; Synchronization; Critical section problem; Deadlocks"
        },
        {
          title: "UNIT 5: Advanced OS Concepts",
          description: "Network, distributed, and multiprocessor OS; Case studies of various OS"
        }
      ]
    },
    "CS-406(A)": {
      name: "Programming Practices (Java)",
      units: [
        {
          title: "Basic Java Features",
          description: "Data types; Classes; Methods; Inheritance; Exception handling"
        },
        {
          title: "Java Collective Frame Work",
          description: "Data structures; Generics; Collections; Algorithms"
        },
        {
          title: "Advance Java Features",
          description: "Multithreading; Networking; Database access with JDBC"
        },
        {
          title: "Advance Java Technologies",
          description: "Servlets; JSP; Multimedia in Java"
        },
        {
          title: "Advance Web/Internet Programming",
          description: "J2ME; J2EE; EJB; XML"
        }
      ]
    },
    "CS-406(B)": {
      name: "Programming Practices (Dot Net Technologies)",
      units: [
        {
          title: "Unit 1",
          description: ".NET framework; Architecture; Components; Elements"
        },
        {
          title: "Basic Features Of C#",
          description: "Classes; Objects; Inheritance; Polymorphism; Structures"
        },
        {
          title: "Advanced Features Of C#",
          description: "Interfaces; Arrays; Exception handling; Delegates; Events"
        },
        {
          title: "ASP.NET and Windows Forms",
          description: "ASP.NET controls; Windows applications; Event handling"
        },
        {
          title: "Advanced Concepts",
          description: "ADO.NET; Database controls; XML handling; Web services"
        }
      ]
    },
    "CS-406(C)": {
      name: "Programming Practices (Python)",
      units: [
        {
          title: "Introduction",
          description: "Syntax; Data types; Operators; Functions; I/O operations"
        },
        {
          title: "Data Structure",
          description: "Lists; Tuples; Dictionary; Sets"
        },
        {
          title: "Control Flow",
          description: "Conditional statements; Iterative statements; Control statements"
        },
        {
          title: "Object oriented programming",
          description: "Classes; Objects; Inheritance; Overloading; Data hiding"
        },
        {
          title: "Advanced Topics",
          description: "Exception handling; Modules; Standard libraries; Network programming"
        }
      ]
    },
    "CS-406(D": {
      name: "Programming Practices (MATLAB)",
      units: [
        {
          title: "MATLAB Overview",
          description: "Basic functions; Data types; Command handling; Building expressions"
        },
        {
          title: "Vector and Matrix Operations",
          description: "Array creation; Matrix operations; Mathematical functions"
        },
        {
          title: "Graphics in MATLAB",
          description: "2D/3D plots; Data visualization; Multiple graphics"
        },
        {
          title: "MATLAB Programming",
          description: "M-files; Scripts; Functions; Debugging; Image processing"
        },
        {
          title: "Neural Networks with MATLAB",
          description: "Neural network concepts; Architecture; Network toolbox; Applications"
        }
      ]
    },

    // Third Year courses
    "CS-501": {
      name: "Theory of Computation",
      units: [
        {
          title: "Unit-I",
          description: "Introduction of Automata Theory: Finite Automata, Moore and Mealy machines"
        },
        {
          title: "Unit-II",
          description: "Types of Finite Automata: NDFA, DFA, minimization, regular expressions, Arden's theorem"
        },
        {
          title: "Unit-III",
          description: "Grammars: Types, derivation trees, ambiguity, Chomsky hierarchy, normal forms"
        },
        {
          title: "Unit-IV",
          description: "Push down Automata: PDA examples, deterministic and non-deterministic PDA, Petrinet model"
        },
        {
          title: "Unit-V",
          description: "Turing Machine: Construction, Universal TM, decidability, halting problem"
        }
      ]
    },
    "CS-502": {
      name: "Database Management Systems",
      units: [
        {
          title: "Unit I",
          description: "DBMS Concepts: Database approach, data models, schemas, data independence, ER model"
        },
        {
          title: "Unit II",
          description: "Relational Data Models: Relations, keys, integrity constraints, SQL, relational algebra"
        },
        {
          title: "Unit III",
          description: "Database Design: Normalization, functional dependencies, query optimization"
        },
        {
          title: "Unit IV",
          description: "Transaction Processing: Serializability, recovery, concurrency control, distributed databases"
        },
        {
          title: "Unit V",
          description: "RDBMS Implementation: Oracle/MySQL, SQL queries, PL/SQL, cursors, procedures, triggers"
        }
      ]
    },
    "CS-503(A)": {
      name: "Data Analytics",
      units: [
        {
          title: "UNIT-I",
          description: "Descriptive Statistics: Probability distributions, inferential statistics, hypothesis testing"
        },
        {
          title: "UNIT-II",
          description: "Big Data Introduction: 4Vs, analytics applications, Hadoop's parallel world"
        },
        {
          title: "UNIT-III",
          description: "Processing Big Data: Integration, mapping data, transformation for processing"
        },
        {
          title: "UNIT-IV",
          description: "Hadoop MapReduce: Components, distributed processing, HDFS, execution modes"
        },
        {
          title: "UNIT-V",
          description: "Big Data Tools: Pig, Hive, Oracle Big Data, data processing operators"
        }
      ]
    },
    "CS-503(B)": {
      name: "Pattern Recognition",
      units: [
        {
          title: "Unit-I",
          description: "Introduction: Pattern recognition principles, classification vs clustering"
        },
        {
          title: "Unit-II",
          description: "Classification: Decision trees, naive Bayes, SVM, KNN, prototype selection"
        },
        {
          title: "Unit-III",
          description: "Clustering: K-means, hierarchical clustering, validation techniques"
        },
        {
          title: "Unit-IV",
          description: "Feature Extraction: Selection methods, branch and bound, sequential algorithms"
        },
        {
          title: "Unit-V",
          description: "Advanced Topics: SVMs, fuzzy classification, neuro-fuzzy techniques"
        }
      ]
    },
    "CS-503(C)": {
      name: "Cyber Security",
      units: [
        {
          title: "UNIT 1",
          description: "Introduction to Cyber Crime: Classifications, email spoofing, spamming, theft techniques"
        },
        {
          title: "UNIT 2",
          description: "Web Crimes: Web jacking, online frauds, network intrusions, session hijacking"
        },
        {
          title: "UNIT 3",
          description: "Cyber Crime and Law: IT Act 2000, hacking, fraud, jurisdictional issues"
        },
        {
          title: "UNIT 4",
          description: "Electronic Evidence: Status in legal system, digital signatures, electronic agreements"
        },
        {
          title: "UNIT 5",
          description: "Cybercrime Tools: Password cracking, keyloggers, viruses, DoS attacks, phishing"
        }
      ]
    },
    "CS-504(A)": {
      name: "Internet and Web Technology",
      units: [
        {
          title: "UNIT 01",
          description: "Introduction: WWW, HTTP, browsers, web servers, Web 2.0, effective web design"
        },
        {
          title: "UNIT 02",
          description: "HTML: Basics, formatting, hyperlinks, tables, forms, XHTML, HTML5 features"
        },
        {
          title: "UNIT 03",
          description: "CSS and JavaScript: Style sheets, CSS3, client-side scripting, DOM, DHTML"
        },
        {
          title: "UNIT 04",
          description: "XML and PHP: XML components, DTD, schemas, PHP basics, forms, files, OOP"
        },
        {
          title: "UNIT 05",
          description: "PHP-MySQL: Database operations, connections, tables, queries, PHP myadmin"
        }
      ]
    },
    "CS-504(B)": {
      name: "Object Oriented Programming",
      units: [
        {
          title: "Unit-I",
          description: "Programming Basics: Character set, variables, keywords, type declarations"
        },
        {
          title: "Unit-II",
          description: "Control Structures: Decision control, loops, operators, break, continue statements"
        },
        {
          title: "Unit-III",
          description: "Arrays and Strings: 1D and 2D arrays, initialization, string functions"
        },
        {
          title: "Unit-IV",
          description: "Structures and Preprocessor: Structure elements, unions, directives"
        },
        {
          title: "Unit-V",
          description: "OOP Concepts: Objects, classes, inheritance, polymorphism, encapsulation"
        }
      ]
    },
    "CS-504(C)": {
      name: "Introduction to Database Management Systems",
      units: [
        {
          title: "Unit 1",
          description: "DBMS Concepts: Database significance, data independence, entities, attributes"
        },
        {
          title: "Unit 2",
          description: "Database Models: Relational, hierarchical, network, E-R modeling"
        },
        {
          title: "Unit 3",
          description: "SQL DDL: SQL commands categories, table creation, keys, indexes"
        },
        {
          title: "UNIT 4",
          description: "SQL DML: Insert, delete, update, merge statements with conditions"
        },
        {
          title: "UNIT 5",
          description: "SELECT: Queries, joins, operators, hierarchical queries, ANSI SQL constructs"
        }
      ]
    },
    "CS-505": {
      name: "Linux (LAB)",
      units: [
        {
          title: "Overview of Unix/Linux",
          description: "Concepts, installation, features, kernel functions"
        },
        {
          title: "Shell Programming",
          description: "Shell variables, control structures, server applications"
        },
        {
          title: "File System",
          description: "File system types, disk structure, inodes, tuning and repair"
        },
        {
          title: "Process Control",
          description: "Process attributes, states, commands, scheduling, priorities"
        },
        {
          title: "System Security",
          description: "Access control, file permissions, ACLs, user access restrictions"
        },
        {
          title: "DHCP",
          description: "Configuration, scopes, server setup, client configuration"
        }
      ]
    },
    "CS-506": {
      name: "Python",
      units: [
        {
          title: "Experiments",
          description: "Python programs for algorithms (GCD, sorting, searching), data structures, file handling, and GUI applications with Pygame"
        }
      ]
    },

    "CS-601": { 
      name: "Machine Learning", 
      units: [
        { 
          title: "Unit I", 
          description: "Introduction to machine learning, regression, probability, statistics, linear algebra, convex optimization, data visualization, hypothesis testing, data preprocessing, supervised and unsupervised learning models." 
        },
        { 
          title: "Unit II", 
          description: "Neural networks: linearity vs non-linearity, activation functions, weights and bias, loss function, gradient descent, backpropagation, regularization techniques, hyperparameter tuning." 
        },
        { 
          title: "Unit III", 
          description: "Convolutional neural networks, layers (convolution, pooling, loss), flattening, padding, stride, inception networks, transfer learning, dimension reductions, implementations like TensorFlow, Keras." 
        },
        { 
          title: "Unit IV", 
          description: "Recurrent neural networks, LSTM, GRU, translation, attention models, reinforcement learning, MDP, Bellman equations, Q-learning, SARSA." 
        },
        { 
          title: "Unit V", 
          description: "Support Vector Machines, Bayesian learning, applications in computer vision, speech processing, natural language processing, case study of ImageNet Competition." 
        }
      ] 
    },
    "CS-602": { 
      name: "Computer Networks", 
      units: [
        { 
          title: "Unit I", 
          description: "Computer network definitions, goals, components, architecture, classifications, layered architecture, protocol hierarchy, ISO-OSI Reference Model, TCP/IP comparison, physical layer principles." 
        },
        { 
          title: "Unit II", 
          description: "Data Link Layer services, framing, flow control, error control, protocols (Elementary, Sliding Window), protocol verification, ARP/RARP/GARP." 
        },
        { 
          title: "Unit III", 
          description: "MAC sublayer, addressing, access methods (ALOHA, CSMA variants), collision-free protocols, limited contention protocols, IEEE 802 standards." 
        },
        { 
          title: "Unit IV", 
          description: "Network Layer services, routing algorithms, IP addressing, header format, packet forwarding, fragmentation, ICMP, IPv4 vs IPv6." 
        },
        { 
          title: "Unit V", 
          description: "Transport Layer (UDP, TCP) and Application Layer protocols (HTTP, FTP, SSH, Email, DNS, SNMP)." 
        }
      ] 
    },
    "CS-603(A)": { 
      name: "Advanced Computer Architecture", 
      units: [
        { 
          title: "Unit I", 
          description: "Flynn's Classification, parallel computer models, system performance, dependencies, hardware/software parallelism, interconnection networks." 
        },
        { 
          title: "Unit II", 
          description: "Instruction set architectures (CISC, RISC, VLIW), memory hierarchy, interleaved memory organization, backplane bus systems." 
        },
        { 
          title: "Unit III", 
          description: "Pipeline processors (linear/nonlinear), instruction pipelining, hazards, dynamic scheduling, branch handling, arithmetic pipelines, superscalar design." 
        },
        { 
          title: "Unit IV", 
          description: "Cache coherence protocols, message routing, vector processing principles, SIMD organization, multithreading principles." 
        },
        { 
          title: "Unit V", 
          description: "Parallel programming models, shared-variable model, message-passing model, data-parallel model, parallel languages and compilers, programming environments." 
        }
      ] 
    },
    "CS-603(B)": { 
      name: "Computer Graphics & Visualization", 
      units: [
        { 
          title: "Unit I", 
          description: "Display systems, scan conversion techniques, line/circle drawing algorithms, polygon fill algorithms." 
        },
        { 
          title: "Unit II", 
          description: "2D transformations, homogeneous coordinates, composite transformations, windowing and clipping algorithms." 
        },
        { 
          title: "Unit III", 
          description: "3D transformations, projections, hidden surface elimination, curve generation, illumination models, shading techniques, color models." 
        },
        { 
          title: "Unit IV", 
          description: "Visualization of 2D/3D data, volume rendering, vector field visualization, animation techniques." 
        },
        { 
          title: "Unit V", 
          description: "Multimedia basics, text types, audio/video processing, animation techniques, compression methods, multimedia architecture and databases." 
        }
      ] 
    },
    "CS-603(C)": { 
      name: "Compiler Design", 
      units: [
        { 
          title: "Unit I", 
          description: "Compiler introduction, phases, data structures, lexical analysis, token recognition, LEX." 
        },
        { 
          title: "Unit II", 
          description: "Syntax analysis, parsing techniques (top-down, bottom-up), syntax-directed translation, syntax trees, attribute evaluation." 
        },
        { 
          title: "Unit III", 
          description: "Type checking, run-time environment, storage organization, parameter passing, symbol table, error handling." 
        },
        { 
          title: "Unit IV", 
          description: "Intermediate code generation, basic blocks, flow graphs, register allocation, DAG representation, code generation." 
        },
        { 
          title: "Unit V", 
          description: "Code optimization, basic block optimization, loop optimization, global data flow analysis, code transformations." 
        }
      ] 
    },
    "CS-604(A)": { 
      name: "Knowledge Management", 
      units: [
        { 
          title: "Unit I", 
          description: "Introduction to knowledge management, foundations, evolution from information management, key challenges, ethics." 
        },
        { 
          title: "Unit II", 
          description: "Creating learning and knowledge sharing culture, learning organizations, knowledge markets, tacit knowledge." 
        },
        { 
          title: "Unit III", 
          description: "Knowledge management tools, telecommunications, networks, search engines, information technology, vocabulary control, information mapping." 
        },
        { 
          title: "Unit IV", 
          description: "Knowledge management applications, components of knowledge strategy, case studies in various domains." 
        },
        { 
          title: "Unit V", 
          description: "Future trends, advanced topics, knowledge management planning, corporate memories case study." 
        }
      ] 
    },
    "CS-604(B)": { 
      name: "Project Management", 
      units: [
        { 
          title: "Unit I", 
          description: "Conventional software management, software economics, improving economics, modern software management principles." 
        },
        { 
          title: "Unit II", 
          description: "Software management process framework, lifecycle phases, artifacts, model-based architectures, workflows, checkpoints." 
        },
        { 
          title: "Unit III", 
          description: "Software management disciplines, iterative process planning, project organization, process automation, project control." 
        }
      ] 
    },
    "CS-604(C)": { 
      name: "Rural Technology & Community Development", 
      units: [
        { 
          title: "Unit I", 
          description: "Rural management principles, planning, organization structure, motivation, leadership, control and decision making." 
        },
        { 
          title: "Unit II", 
          description: "Human resource management for rural India, planning, recruitment, training, performance appraisal, welfare programs, industrial relations." 
        },
        { 
          title: "Unit III", 
          description: "Rural financing systems, agricultural credit, non-farm sector credit, role of government and non-government institutions." 
        },
        { 
          title: "Unit IV", 
          description: "Research methodology concepts, qualitative data collection methods, interview techniques, sociometry, case studies." 
        },
        { 
          title: "Unit V", 
          description: "Data collection and presentation, statistical measures, correlation, regression, sampling theory, significance testing." 
        }
      ] 
    },
    "CS-605": { 
      name: "Data Analytics Lab", 
      units: [
        { 
          title: "Unit I", 
          description: "Data analytics framework basics, statistics, probability, distributions, data exploration, correlation, regression, visualization." 
        },
        { 
          title: "Unit II", 
          description: "Introduction to R as a data analytics tool." 
        },
        { 
          title: "Unit III", 
          description: "Introduction to MATLAB as a data analytics tool." 
        },
        { 
          title: "Unit IV", 
          description: "Introduction to Python as a data analytics tool." 
        },
        { 
          title: "Unit V", 
          description: "Case studies in data analytics." 
        }
      ] 
    },
    "CS-606": { 
      name: "Skill Development Lab", 
      units: [
        { 
          title: "Unit I", 
          description: "Software product life cycle." 
        },
        { 
          title: "Unit II", 
          description: "Software product development standards." 
        },
        { 
          title: "Unit III", 
          description: "Design patterns - I." 
        },
        { 
          title: "Unit IV", 
          description: "Design patterns - II." 
        },
        { 
          title: "Unit V", 
          description: "Case study in software development." 
        }
      ] 
    },

    //final year courses

    "CS-701": {
      name: "Software Architectures",
      units: [
        {
          title: "Unit 1",
          description: "Overview of software development methodology, quality models, introduction to software architecture, evolution, components, connectors, frameworks, and Architecture business cycle."
        },
        {
          title: "Unit 2",
          description: "Software architecture models (structural, framework, dynamic, process) and architecture styles (dataflow, pipes and filters, call-and-return, data-centered, layered, agent-based, micro-services, reactive, REST)."
        },
        {
          title: "Unit 3",
          description: "Software architecture implementation technologies including ADLs, Struts, Hibernate, Node JS, Angular JS, J2EE and middleware technologies. Role of UML in software architecture."
        },
        {
          title: "Unit 4",
          description: "Software architecture analysis and design, requirements, lifecycle view, economic analysis methods (CBAM, ATAM), reviews (ARID), Attribute Driven Design, architecture reuse, domain-specific architectures."
        },
        {
          title: "Unit 5",
          description: "Software architecture documentation principles, refinement, context diagrams, variability, interfaces, behavior documentation, and seven-part template documentation package."
        }
      ]
    },
  
    "CS-702(A)": {
      name: "Computational Intelligence",
      units: [
        {
          title: "Unit 1",
          description: "Introduction to Computational Intelligence, types, components, learning/training models, parametric and nonparametric models, multilayer networks (feedforward and feedback)."
        },
        {
          title: "Unit 2",
          description: "Fuzzy Systems including fuzzy set theory, operations, membership functions, fuzzy relations, measures, logic, inferencing, and fuzzy control."
        },
        {
          title: "Unit 3",
          description: "Genetic Algorithms covering basic genetics concepts, working principles, offspring creation, encoding, fitness functions, selection functions, genetic operators, modeling, and benefits."
        },
        {
          title: "Unit 4",
          description: "Rough Set Theory fundamentals, set approximation, rough membership, attributes, optimization, Hidden Markov Models, and decision tree models."
        },
        {
          title: "Unit 5",
          description: "Swarm Intelligence introduction and techniques including Ant Colony Optimization, Particle Swarm Optimization, Bee Colony Optimization, and applications of Computational Intelligence."
        }
      ]
    },
  
    "CS-702(B)": {
      name: "Deep & Reinforcement Learning",
      units: [
        {
          title: "Unit 1",
          description: "Deep Learning history, McCulloch Pitts Neuron, thresholding logic, activation functions, gradient descent variants, eigenvalue decomposition, RNNs, backpropagation, GRUs, LSTMs, encoder-decoder models, and attention mechanisms."
        },
        {
          title: "Unit 2",
          description: "Autoencoders, regularization techniques, bias-variance tradeoff, early stopping, dataset augmentation, parameter sharing, noise injection, ensemble methods, dropout, and normalization techniques."
        },
        {
          title: "Unit 3",
          description: "Greedy layerwise pre-training, vectorial word representations, CNNs (LeNet, AlexNet, ZF-Net, VGGNet, GoogLeNet, ResNet), visualization techniques, and recent trends in deep learning architectures."
        },
        {
          title: "Unit 4",
          description: "Reinforcement learning introduction, bandit algorithms, policy gradient, MDPs, Bellman optimality, dynamic programming, Q-learning, temporal difference methods, function approximation, and least squares methods."
        },
        {
          title: "Unit 5",
          description: "Advanced RL algorithms including fitted Q, deep Q-learning, policy gradient, hierarchical RL, POMDPs, actor-critic method, inverse reinforcement learning, and recent trends in RL architectures."
        }
      ]
    },
  
    "CS-702(C)": {
      name: "Wireless & Mobile Computing",
      units: [
        {
          title: "Unit 1",
          description: "Review of traditional networks (LAN, MAN, WAN), TCP/IP architecture, addressing, routing table format, ICMP, subnetting, NAT, VLANs, and IPv6."
        },
        {
          title: "Unit 2",
          description: "Traditional routing and transport protocols including BGP, RIP, OSPF, TCP, flow control, retransmission algorithms, connection control, and UDP."
        },
        {
          title: "Unit 3",
          description: "Wireless LAN transmission mediums, MAC problems, IEEE 802.11 architecture, spread spectrum, power management, security, Mobile IP, and ad hoc network routing."
        },
        {
          title: "Unit 4",
          description: "Mobile transport layer protocols (I-TCP, S-TCP, M-TCP), wireless cellular networks, GSM services, architecture, localization, handover and roaming."
        },
        {
          title: "Unit 5",
          description: "Mobile device operating systems, constraints, commercial mobile OS, software development kits (iOS, Android), M-Commerce structure, mobile payment systems, and security issues."
        }
      ]
    },
  
    "CS-702(D)": {
      name: "Big Data",
      units: [
        {
          title: "Unit 1",
          description: "Introduction to Big Data, characteristics, types, traditional vs. big data, evolution, challenges, technologies, infrastructure, data analytics usage, and desired properties of big data systems."
        },
        {
          title: "Unit 2",
          description: "Hadoop introduction, core components, eco-system, Hive architecture, limitations, RDBMS vs. Hadoop, HDFS, data processing, YARN resource management, and MapReduce programming."
        },
        {
          title: "Unit 3",
          description: "Hive introduction, architecture, data types, query language, Pig introduction, anatomy, ETL processing, data types, execution model, operators and functions."
        },
        {
          title: "Unit 4",
          description: "NoSQL introduction, business drivers, architectural patterns, variations, managing big data with NoSQL, and introduction to MongoDB."
        },
        {
          title: "Unit 5",
          description: "Social Network Graph mining, applications, social networks as graphs, types, clustering, community discovery, and introduction to recommender systems."
        }
      ]
    },
  
    "CS-703(A)": {
      name: "Cryptography & Information Security",
      units: [
        {
          title: "Unit 1",
          description: "Mathematical background for cryptography, introduction to cryptography principles, classical cryptosystems, cryptanalysis, ciphers, and encryption standards."
        },
        {
          title: "Unit 2",
          description: "Advanced Encryption Standard, public key cryptosystems, discrete logarithmic problem, Diffie-Hellman key exchange, RSA assumptions and cryptosystems, signatures, and elliptic curve cryptography."
        },
        {
          title: "Unit 3",
          description: "Message authentication, digital signatures, key management, exchange, hash functions, MD, SHA, DSS, cryptanalysis attacks, and secure authentication systems."
        },
        {
          title: "Unit 4",
          description: "Information security threats, network security controls, wireless security, firewalls, IDS, email security, IP security, and web security protocols."
        },
        {
          title: "Unit 5",
          description: "Cryptography and security tools including spoofing, footprinting, vulnerability scanning, NetBIOS enumeration, steganography, trojan detection, and DoS attack tools."
        }
      ]
    },
  
    "CS-703(B)": {
      name: "Data Mining and Warehousing",
      units: [
        {
          title: "Unit 1",
          description: "Data warehousing introduction, delivery process, architecture, data preprocessing, cleaning, integration, transformation, reduction, warehouse design, schema, partitioning, implementation, data marts, and pattern warehousing."
        },
        {
          title: "Unit 2",
          description: "OLAP systems concepts, queries, server types, operations, data warehouse hardware and operational design, security, backup and recovery."
        },
        {
          title: "Unit 3",
          description: "Introduction to data and data mining, data types, quality, preprocessing, similarity measures, statistics, distributions, basic mining tasks, and fuzzy sets and logic."
        },
        {
          title: "Unit 4",
          description: "Supervised learning classification including statistical-based, distance-based, decision tree-based, neural network-based, rule-based, and probabilistic classifiers."
        },
        {
          title: "Unit 5",
          description: "Clustering algorithms (hierarchical, partitional, large database clustering) and association rule mining with parallel and distributed algorithms."
        }
      ]
    },
  
    "CS-703(C)": {
      name: "Agile Software Development",
      units: [
        {
          title: "Unit 1",
          description: "Fundamentals of Agile Process including manifesto, principles, stakeholders, challenges, and overview of agile development models (Scrum, XP, FDD, Crystal, Kanban, Lean)."
        },
        {
          title: "Unit 2",
          description: "Agile project planning for different team types, lifecycles, product vision, release planning, backlog creation, user stories, prioritization, estimation, and monitoring."
        },
        {
          title: "Unit 3",
          description: "Scrum framework, artifacts, meetings, roles, team simulation, planning principles, product and release planning, sprint processes, user stories, and case study."
        },
        {
          title: "Unit 4",
          description: "Extreme Programming (XP) lifecycle, team structure, concepts (refactoring, technical debt, timeboxing, stories, velocity), adoption prerequisites, challenges, and case study."
        },
        {
          title: "Unit 5",
          description: "Agile software design and development practices, design principles, refactoring techniques, continuous integration, build tools, version control, quality assurance, and test-driven development."
        }
      ]
    },
  
    "CS-703(D)": {
      name: "Disaster Management",
      units: [
        {
          title: "Unit 1",
          description: "Introduction to disasters, definitions, types (earthquake, landslide, flood, drought, fire), classification, impacts, differential effects, global trends, and dos and don'ts."
        },
        {
          title: "Unit 2",
          description: "Approaches to disaster risk reduction, disaster cycle, safety culture, prevention, mitigation, preparedness, roles of stakeholders, institutional frameworks, and early warning systems."
        },
        {
          title: "Unit 3",
          description: "Inter-relationship between disasters and development, vulnerability factors, impact of development projects, climate change adaptation, IPCC scenarios, and indigenous knowledge."
        },
        {
          title: "Unit 4",
          description: "Disaster risk management in India, hazard profile, components of disaster relief, institutional arrangements, disaster management act and policy, GIS applications, and damage assessment."
        },
        {
          title: "Unit 5",
          description: "Disaster management applications, case studies (landslide, earthquake, drought, coastal flooding, forest fire, man-made disasters), space-based inputs, and field work."
        }
      ]
    },
  
    "CS-801": {
      name: "Internet of Things",
      units: [
        {
          title: "Unit 1",
          description: "IoT definition, characteristics, frameworks, ecosystem components, physical and logical design, enablers, applications, communications, reference architecture, network configurations, and microcontroller basics."
        },
        {
          title: "Unit 2",
          description: "Sensors definition, components, challenges, features, resolution, classes, types, errors, actuators and their types (hydraulic, pneumatic, electrical, thermal/magnetic, mechanical, soft)."
        },
        {
          title: "Unit 3",
          description: "IoT networking basics, components, functional components, service-oriented architecture, challenges, 6LowPAN, IEEE 802.15.4, ZigBee, RFID, NFC, Bluetooth, and wireless sensor networks."
        },
        {
          title: "Unit 4",
          description: "MQTT protocol methods, components, communication, topics, applications, SMQTT, CoAP message types and request-response model, XMPP, and AMQP features and frame types."
        },
        {
          title: "Unit 5",
          description: "IoT platforms (Arduino, Raspberry Pi), data analytics for IoT, cloud support, storage models, APIs, system attacks, vulnerability analysis, and case studies (smart home, farming)."
        }
      ]
    },
  
    "CS-802(A)": {
      name: "Block Chain Technologies",
      units: [
        {
          title: "Unit 1",
          description: "Blockchain overview, public ledgers, Bitcoin, smart contracts, blockchain structure, transactions, distributed consensus, public vs private blockchains, security aspects, and basic cryptographic primitives."
        },
        {
          title: "Unit 2",
          description: "Blockchain with cryptocurrency, Bitcoin creation, payments, scripts, P2P network, transaction processing, mining, block propagation, consensus mechanisms, and mining concepts."
        },
        {
          title: "Unit 3",
          description: "Enterprise blockchain, permissioned models, use cases, design issues, contract execution, state machine replication, and consensus models for permissioned blockchains."
        },
        {
          title: "Unit 4",
          description: "Enterprise blockchain applications including cross-border payments, KYC, food security, mortgages, trade, finance networks, supply chain financing, and identity management."
        },
        {
          title: "Unit 5",
          description: "Blockchain application development with Hyperledger Fabric architecture, identities, policies, membership, access control, channels, transaction validation, and smart contract development."
        }
      ]
    },
  
    "CS-802(B)": {
      name: "Cloud Computing",
      units: [
        {
          title: "Unit 1",
          description: "Service-oriented architecture, web services, SOAP, WSDL, UDDI, RESTful services, SaaS, PaaS, organizational cloud scenarios, administration, monitoring, benefits, limitations, and hypervisors."
        },
        {
          title: "Unit 2",
          description: "Utility and elastic computing, Ajax interfaces, mashups, virtualization technology in enterprises, virtualization pitfalls, and multitenant software approaches."
        },
        {
          title: "Unit 3",
          description: "Cloud data storage including relational databases, cloud file systems (GFS, HDFS), BigTable, HBase, Dynamo, Map-Reduce model, parallel efficiency, operations, and applications."
        },
        {
          title: "Unit 4",
          description: "Cloud security fundamentals, vulnerability assessment, privacy concerns, security architecture, virtualization security management, threats, recommendations, and secure communications."
        },
        {
          title: "Unit 5",
          description: "Cloud computing issues, real-time applications, QoS, dependability, data migration, streaming, middleware, mobile cloud, inter-cloud issues, load balancing, optimization, and performance evaluation."
        }
      ]
    },
  
    "CS-802(C)": {
      name: "High Performance Computing",
      units: [
        {
          title: "Unit 1",
          description: "Modern processor architectures, performance metrics, Moore's Law, pipelining, memory hierarchies, multi-core and multi-threaded processors, vector processors, and serial code optimizations."
        },
        {
          title: "Unit 2",
          description: "Data access optimizations, balance analysis, storage order, algorithm classifications, case studies, parallel computer types (shared memory, distributed memory, hybrid, network)."
        },
        {
          title: "Unit 3",
          description: "Parallel computing basics, data and functional parallelism, scalability laws, metrics, efficiency, and shared memory parallel programming with OpenMP."
        },
        {
          title: "Unit 4",
          description: "Efficient OpenMP programming techniques, profiling, performance pitfalls, work sharing improvements, overhead determination, and addressing serialization and false sharing."
        },
        {
          title: "Unit 5",
          description: "Distributed memory programming with MPI, message passing, point-to-point and collective communication, virtual topologies, and efficient MPI programming techniques."
        }
      ]
    },
  
    "CS-802(D)": {
      name: "Object Oriented Software Engineering",
      units: [
        {
          title: "Unit 1",
          description: "Review of object-oriented concepts, principles, paradigm, basic concepts, and software development lifecycle and model architectures."
        },
        {
          title: "Unit 2",
          description: "Rational Unified Process (RUP) concepts, development symptoms and root causes, best practices, software lifecycle, 4+1 view model, and workflows."
        },
        {
          title: "Unit 3",
          description: "UML introduction, notations, relationships, stereotypes, tools, object-oriented analysis comparison with conventional approaches, requirements analysis, and use case diagrams."
        },
        {
          title: "Unit 4",
          description: "Object-oriented design compared to conventional approaches, CRC cards, class diagrams, behavioral modeling with interaction and state chart diagrams, and implementation diagrams."
        },
        {
          title: "Unit 5",
          description: "Object-oriented testing for correctness and consistency, testing strategies, test cases, project management, rational tool mentors, and introduction to design patterns."
        }
      ]
    },
  
    "CS-803(A)": {
      name: "Image Processing and Computer Vision",
      units: [
        {
          title: "Unit 1",
          description: "Introduction to computer vision and image processing basics, history, evolution, models, filtering, representations, statistics, recognition methodology, and morphological operations."
        },
        {
          title: "Unit 2",
          description: "Image representation and description schemes, boundary and region descriptors, binary machine vision techniques, segmentation methods, and area extraction concepts."
        },
        {
          title: "Unit 3",
          description: "Region analysis properties, external points, spatial moments, mixed moments, boundary analysis, signature properties, and shape numbers, frameworks for matching."
        },
        {
          title: "Unit 4",
          description: "Facet model recognition, line labeling, understanding drawings, shape classification and recognition, perspective projective geometry, and image matching techniques."
        },
        {
          title: "Unit 5",
          description: "Knowledge-based vision, representation, control strategies, information integration, object recognition methods, shape correspondence and matching, and neural networks."
        }
      ]
    },
  
    "CS-803(B)": {
      name: "Game Theory with Engineering Applications",
      units: [
        {
          title: "Unit 1",
          description: "Game overview, design schema, fundamentals, engineering applications, design process, iterative design, commissions, board game design and testing, and meaningful play concepts."
        },
        {
          title: "Unit 2",
          description: "Introduction to design, design and meaning, semiotics overview, four semiotic concepts, and context shaping interpretations."
        },
        {
          title: "Unit 3",
          description: "Systems introduction, system elements, framing, open and closed systems, interactivity models, interaction and choice, choice molecules, anatomy, and space of possibility."
        },
        {
          title: "Unit 4",
          description: "Game definitions, digital games overview, magic circle concept, and primary schemas (conceptual framework, rule, play, culture)."
        },
        {
          title: "Unit 5",
          description: "Rules definition, card deck rules, rule quality, context, rule levels (operational, constituative, implicit), game identity, rule specificity, digital game rules, and case studies."
        }
      ]
    },
  
    "CS-803(C)": {
      name: "Internet of Things",
      units: [
        {
          title: "Unit 1",
          description: "IoT definition, characteristics, frameworks, ecosystem components, physical and logical design, enablers, applications, communications, reference architecture, network configurations, and microcontroller basics."
        },
        {
          title: "Unit 2",
          description: "Sensors definition, components, challenges, features, resolution, classes, types, errors, actuators and their types (hydraulic, pneumatic, electrical, thermal/magnetic, mechanical, soft)."
        },
        {
          title: "Unit 3",
          description: "IoT networking basics, components, functional components, service-oriented architecture, challenges, 6LowPAN, IEEE 802.15.4, ZigBee, RFID, NFC, Bluetooth, and wireless sensor networks."
        },
        {
          title: "Unit 4",
          description: "MQTT protocol methods, components, communication, topics, applications, SMQTT, CoAP message types and request-response model, XMPP, and AMQP features and frame types."
        },
        {
          title: "Unit 5",
          description: "IoT platforms (Arduino, Raspberry Pi), data analytics for IoT, cloud support, storage models, APIs, system attacks, vulnerability analysis, and case studies (smart home, farming)."
        }
      ]
    },
  
    "CS-803(D)": {
      name: "Managing Innovation and Entrepreneurship",
      units: [
        {
          title: "Unit 1",
          description: "Innovation definitions, classifications, relationship with entrepreneurship, competitive advantage creation, innovative models, and types of innovation (product, process, organizational, marketing)."
        },
        {
          title: "Unit 2",
          description: "Innovation sources (push, pull, analogies), technology transfer, creative methods and approaches in innovation management (agile, Six Thinking Hats, NUF test)."
        },
        {
          title: "Unit 3",
          description: "Project approach to innovation management, Stage Gate method, adaptation to business models, and in-house business development of innovation processes."
        },
        {
          title: "Unit 4",
          description: "Human-focused innovations, co-creation role in innovation processes, innovation process strategy types and selection."
        },
        {
          title: "Unit 5",
          description: "Innovation benefit measurement and evaluation (financial and non-financial metrics), barriers to innovation, failure causes, post-audits, and innovation workshop organization."
        }
      ]
    }
  
  };

  export default courseData;


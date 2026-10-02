window.RESEARCH_CONFIG = {
  title: "Research",
  intro: "My research interests lie broadly in algorithms, combinatorics, and optimization, with connections to computer science and operations research. I am particularly interested in the design and analysis of approximation algorithms and in understanding the combinatorial and polyhedral structure underlying optimization problems.",
  tags: ["Approximation Algorithms", "Combinatorial Optimization", "Polyhedral Combinatorics", "Network Flow", "Graph Theory", "Linear Algebra", "Demand Matching", "Traveling Salesman Problem", "Submodular Flow", "Thesis"],
  publications: [
    {
      title: "Bicriteria Approximation Algorithms for Demand Matching",
      authors: "Yuchong Pan, Michel X. Goemans",
      venue: "The 10th SIAM Symposium on Simplicity in Algorithms (SOSA 2027), to appear",
      selected: true,
      tags: ["Approximation Algorithms", "Combinatorial Optimization", "Polyhedral Combinatorics", "Demand Matching"],
      paper: "https://arxiv.org/abs/2608.04223",
      abstract: [
        "The demand matching problem generalizes both the knapsack problem and the $b$-matching problem. In this problem, each edge of a graph has a demand and a weight, each vertex has a capacity, and the goal is to find a maximum weight subset of edges whose total incident demand at every vertex does not exceed its capacity. We study $(\\alpha, \\beta)$-bicriteria approximation algorithms, which return a solution of weight at least $1/\\alpha$ times the optimum while allowing an additive capacity violation of at most $\\beta$ times the maximum edge demand.",
        "We give an iterative relaxation algorithm for the demand matching problem that exploits a structural characterization of strictly fractional extreme points of the natural LP relaxation, which reduces the residual rounding problem to odd-cycle instances. Combined with a better-of-two rounding strategy, this yields $(7/6, 1)$- and $(1, 1)$-bicriteria approximation algorithms for general and bipartite graphs, respectively. We further generalize this approach to obtain a parametric family of algorithms, including a $(1, 4/3)$-bicriteria approximation. Separately, for the more general $k$-hypergraph demand matching problem, we give a greedy, combinatorial $(k, 1)$-bicriteria approximation algorithm.",
        "We complement these algorithmic results with matching lower bounds relative to the natural LP relaxation for $\\beta = 0$ and all $\\beta \\geq 1$, completely characterizing the trade-off between weight approximation and additive capacity violation in this range."
      ]
    },
    {
      title: "A Better-Than-$3$ Approximation Algorithm for Demand Matching via Knapsack Intersection LP and Contention Resolution",
      authors: "Michel X. Goemans, Yuchong Pan",
      venue: "arXiv preprint arXiv:2609.17932",
      selected: true,
      tags: ["Approximation Algorithms", "Combinatorial Optimization", "Polyhedral Combinatorics", "Demand Matching"],
      paper: "https://arxiv.org/abs/2609.17932",
      abstract: [
        "The demand matching problem generalizes both the knapsack problem and the $b$-matching problem. In this problem, each edge of a graph has a demand and a weight, and each vertex has a capacity. The goal is to find a maximum weight subset of edges such that, at each vertex, the total demand of the incident selected edges does not exceed the vertex capacity. Parekh [IPCO 2011] proved that, if each edge is individually feasible, the natural LP relaxation for demand matching has integrality gap at most $3$, yielding a $3$-approximation algorithm. This bound is tight for the natural LP relaxation, matching the lower bound of Shepherd and Vetta [Math. Oper. Res. 2007].",
        "We present a randomized $(3/2 + \\sqrt{2} + \\varepsilon) \\approx (2.914 + \\varepsilon)$-approximation algorithm for the demand matching problem for every $\\varepsilon > 0$, giving the first approximation ratio strictly better than $3$. For bipartite graphs, we obtain a randomized $(2 + \\varepsilon)$-approximation algorithm for every $\\varepsilon > 0$. Both algorithms run in time polynomial in $1/\\varepsilon$ and the input length. Our algorithms use a strengthened LP relaxation based on intersecting the integral knapsack polytopes associated with the vertices, together with a multiple-choice generalization. As a key ingredient, we prove the existence of a $(q, 1/(1+q))$-balanced contention resolution scheme for the integral knapsack polytope for every $q \\in [0, 1]$, which may be of independent interest. The balance guarantee $1/(1+q)$ is tight in the worst case over all knapsack instances."
      ]
    },
    {
      title: "Planarity via Spanning Tree Number: A Linear-Algebraic Criterion",
      authors: "Alan Bu, Yuchong Pan",
      venue: "SIAM Journal on Discrete Mathematics, 39(2025), pp. 728--751",
      selected: true,
      tags: ["Graph Theory", "Linear Algebra"],
      paper: "https://doi.org/10.1137/24M1660395",
      abstract: "We introduce a novel linear-algebraic planarity criterion based on the number of spanning trees. We call a matrix an incidence submatrix if each row has at most one $1$, at most one $-1$, and all other entries zero. Given a connected graph $G$ with $m$ edges, we consider the maximum determinant $\\mathsf{maxdet}(G)$ of an $m \\times m$ matrix $[M|N]$, where $M$ is the incidence matrix of $G$ with one column removed, over all incidence submatrices $N$ of appropriate size, and define its excess to be the number of spanning trees in $G$ minus $\\mathsf{maxdet}(G)$. Given a disconnected graph, we define its excess to be the sum of the excesses of its connected components. We show that the excess of a graph is $0$ if it is planar, and at least $18$ otherwise. This provides a ``certificate of planarity'' of a planar graph that can be verified by computing the determinant of a sparse matrix and counting spanning trees. Furthermore, we derive an upper bound on the maximum determinant of an $m \\times m$ matrix $[M|N]$, where $M$ and $N$ are incidence submatrices. Motivated by this bound and numerical evidence, we conjecture that this maximum determinant is equal to the maximum number of spanning trees in a planar graph with $m$ edges. We present partial progress towards this conjecture. In particular, we prove that the $\\mathsf{maxdet}(\\cdot)$ value of any subdivision of $K_{3, 3}$ or $K_5$ is at most that of the best planar graph with the same number of edges."
    },
    {
      title: "On High-Value and High-Flow Cycles at Basic Feasible Solutions of Subtour Elimination Relaxations for the Symmetric and Asymmetric Traveling Salesman Problems",
      authors: "Michel X. Goemans, Yuchong Pan",
      venue: "In preparation",
      selected: false,
      tags: ["Combinatorial Optimization", "Polyhedral Combinatorics", "Traveling Salesman Problem"],
      paper: "#"
    },
    {
      title: "A Counterexample to Box-Half-Integrality of the Intersection of Crossing Submodular Flow Systems",
      authors: "Michel X. Goemans, Yuchong Pan",
      venue: "Manuscript",
      selected: false,
      tags: ["Combinatorial Optimization", "Polyhedral Combinatorics", "Linear Algebra", "Submodular Flow"],
      paper: "assets/files/counterexample.pdf",
      abstract: "Abdi, Cornuéjols and Zambelli [Combinatorica 2024] proved that the intersection of two crossing submodular flow systems on a weakly connected digraph is totally dual integral, though not box-integral. Abdi subsequently conjectured that this polyhedral system is box-half-integral. We exhibit a counterexample to this conjecture."
    },
    {
      title: "Optimization Problems on Network Flows with Degree Constraints",
      authors: "Yuchong Pan",
      venue: "Honours Thesis, University of British Columbia",
      selected: false,
      tags: ["Approximation Algorithms", "Combinatorial Optimization", "Network Flow", "Thesis"],
      paper: "assets/files/honoursthesis.pdf",
      abstract: [
        "In a vertex-capacitated directed graph with sources and sinks, we would like to concurrently route demands from the sources to the sinks. This model has many applications in the real world. However, conditions in the reality usually incur new side constraints to this general model. For instance, the next-hop routing in Internet protocol (IP) networks requires each router to have one single next destination, called the next hop, for each incoming packet destined to an IP address. A flow with this property is said to be confluent. If this constraint is relaxed to allow $d$ next destinations at each vertex, then such a flow is said to be $d$-furcated. In general, side constraints concerning bounded out-degree of each vertex give rise to network flows with degree constraints. Such constraints contribute to simplicity of resulting network flow models.",
        "Given a network flow model, several optimization problems can be asked. For instance, how the demands can be routed so that the flow does not exceed the capacity at each vertex too much? Another natural question is to find a subset of the demands with the maximum amount which can be routed subject to the vertex capacities. In this thesis, we survey algorithms that find approximate solutions close to optimum values within theoretically guaranteed factors."
      ]
    }
  ]
};

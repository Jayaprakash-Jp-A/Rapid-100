
export enum PriorityLevel {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum CaseStatus {
  RECEIVED = 'RECEIVED',
  UNDER_ANALYSIS = 'UNDER_ANALYSIS',
  DISPATCHED = 'DISPATCHED',
  EN_ROUTE = 'EN_ROUTE',
  ON_SCENE = 'ON_SCENE',
  ACTION_IN_PROGRESS = 'ACTION_IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  ESCALATED = 'ESCALATED'
}

export interface TimelineEvent {
  time: string;
  event: string;
  status: 'completed' | 'current' | 'pending';
  actor?: string;
}

export interface IncidentCluster {
  id: string;
  masterIncidentType: string;
  callCount: number;
  location: string;
  incidents: string[]; // IDs of clustered incidents
}

export interface SystemMetrics {
  totalCallsToday: number;
  criticalCases: number;
  avgResponseTime: string;
  successRate: number;
  departmentStats: {
    police: number;
    fire: number;
    medical: number;
    cyber: number;
  };
  networkStrain: number;
  activeUnits: number;
  surgeLevel: 'NORMAL' | 'ELEVATED' | 'CRITICAL_SURGE';
  predictionAccuracy: string;
}

export interface EmergencyIncident {
  IncidentID: string;
  Timestamp: string;
  Transcript: string;
  DetectedLanguage: string;
  Translation: string;
  EmergencyType: string;
  SubCategory: string;
  EmotionalState: string;
  EmotionalIntensity: number; // 0-100
  EmotionalToneAnalysis: string;
  DistressMarkers: string[];
  DistressScore: number;
  LifeRiskScore: number;
  PriorityScore: number;
  PriorityLevel: PriorityLevel;
  SurvivalProbability: string;
  FalseCallProbabilityIndex: number; // 0-100
  SilentModeActive: boolean;
  Demographics: {
    EstimatedGender: 'Male' | 'Female' | 'Unknown';
    EstimatedAgeGroup: string;
    VulnerabilityStatus: 'Normal' | 'Elevated' | 'Critical';
    Relationship?: string;
  };
  AcousticAnalysis: {
    DetectedSounds: string[];
    EnvironmentType: string;
    BackgroundNoiseLevel: string;
  };
  DepartmentClassification: {
    PrimaryDepartment: string;
    DepartmentConfidence: string;
    DepartmentPriorityLevel: PriorityLevel;
  };
  LiveTracking: {
    CurrentStatus: CaseStatus;
    AssignedUnit: string;
    EstimatedArrivalTime: string;
    TimeElapsed: string;
    DistanceInKm: string;
    TrafficCondition: string;
    Timeline: TimelineEvent[];
    EscalationTriggered: boolean;
  };
  Clustering: {
    ClusterID?: string;
    IsMasterIncident: boolean;
    RelatedCalls: number;
  };
  Explainability: {
    Reasoning: string;
    KeyEvidence: string[];
    DepartmentLogic: string;
  };
  AdaptiveQuestions: string[];
  Location: string;
  LocationConfidence: string;
  ExplainabilitySummary: string;
}

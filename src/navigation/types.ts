import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  RoleSelection: undefined;
  PatientProfile: undefined;
  MainTabs: undefined;
  ExercisePlayer: {
    categoryId: 'orthopedic' | 'posture' | 'musculoskeletal';
    subCategoryId: string;
    conditionId: string;
  };
  TreatmentProgramDetail: {
    categoryId: 'orthopedic' | 'posture' | 'musculoskeletal';
    subCategoryId: string;
  };
  TreatmentPrograms: {
    categoryId: 'orthopedic' | 'posture' | 'musculoskeletal';
  };
  Assessment: {
    exerciseId: number;
  };
  Settings: undefined;
};

export type ExercisePlayerScreenProps = {
  route: {
    params: {
      categoryId: 'orthopedic' | 'posture' | 'musculoskeletal';
      subCategoryId: string;
      conditionId: string;
    };
  };
  navigation: any;
};

export type TreatmentProgramDetailScreenProps = {
  route: {
    params: {
      categoryId: 'orthopedic' | 'posture' | 'musculoskeletal';
      subCategoryId: string;
    };
  };
  navigation: any;
};

export type AssessmentScreenProps = NativeStackScreenProps<RootStackParamList, 'Assessment'>;

export type TreatmentProgramsScreenProps = {
  route: {
    params: {
      categoryId: 'orthopedic' | 'posture' | 'musculoskeletal';
    };
  };
  navigation: any;
}; 
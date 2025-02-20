import { apiClient } from '../utils/apiClient';
import { CacheManager } from '../utils/cacheManager';
import { CACHE_DURATION } from '../utils/cacheManager';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  sets: number;
  reps: number;
}

export interface ExerciseProgram {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  progress: number;
}

class ExerciseService {
  private static instance: ExerciseService;

  private constructor() {}

  public static getInstance(): ExerciseService {
    if (!ExerciseService.instance) {
      ExerciseService.instance = new ExerciseService();
    }
    return ExerciseService.instance;
  }

  // Egzersiz programlarını getir
  public async getExercisePrograms(): Promise<ExerciseProgram[]> {
    try {
      const programs = await apiClient.get<ExerciseProgram[]>('/programs', {
        useCache: true,
        cacheDuration: CACHE_DURATION.MEDIUM,
      });
      return programs;
    } catch (error) {
      console.error('Egzersiz programları getirilemedi:', error);
      throw error;
    }
  }

  // Belirli bir egzersiz programını getir
  public async getExerciseProgram(programId: string): Promise<ExerciseProgram> {
    try {
      const program = await apiClient.get<ExerciseProgram>(`/programs/${programId}`, {
        useCache: true,
        cacheDuration: CACHE_DURATION.MEDIUM,
      });
      return program;
    } catch (error) {
      console.error(`Egzersiz programı getirilemedi: ${programId}`, error);
      throw error;
    }
  }

  // Egzersiz detaylarını getir
  public async getExerciseDetails(exerciseId: string): Promise<Exercise> {
    try {
      // Önce önbellekten kontrol et
      const cachedExercise = await CacheManager.getCachedExerciseData<Exercise>(exerciseId);
      if (cachedExercise) {
        return cachedExercise;
      }

      // Önbellekte yoksa API'den getir
      const exercise = await apiClient.get<Exercise>(`/exercises/${exerciseId}`);
      
      // Önbelleğe kaydet
      await CacheManager.cacheExerciseData(exerciseId, exercise);
      
      return exercise;
    } catch (error) {
      console.error(`Egzersiz detayları getirilemedi: ${exerciseId}`, error);
      throw error;
    }
  }

  // Egzersiz ilerlemesini güncelle
  public async updateExerciseProgress(
    exerciseId: string,
    progress: number
  ): Promise<void> {
    try {
      await apiClient.put(`/exercises/${exerciseId}/progress`, { progress });
      
      // Önbellekteki egzersiz verisini güncelle
      const exercise = await this.getExerciseDetails(exerciseId);
      if (exercise) {
        await CacheManager.cacheExerciseData(exerciseId, {
          ...exercise,
          progress,
        });
      }
    } catch (error) {
      console.error(`Egzersiz ilerlemesi güncellenemedi: ${exerciseId}`, error);
      throw error;
    }
  }

  // Egzersiz programı ilerlemesini güncelle
  public async updateProgramProgress(
    programId: string,
    progress: number
  ): Promise<void> {
    try {
      await apiClient.put(`/programs/${programId}/progress`, { progress });
    } catch (error) {
      console.error(`Program ilerlemesi güncellenemedi: ${programId}`, error);
      throw error;
    }
  }

  // Önbelleği temizle
  public async clearExerciseCache(exerciseId?: string): Promise<void> {
    try {
      if (exerciseId) {
        await CacheManager.clearCache('EXERCISE_DATA', exerciseId);
      } else {
        await CacheManager.clearCache('EXERCISE_DATA');
      }
    } catch (error) {
      console.error('Egzersiz önbelleği temizlenemedi:', error);
      throw error;
    }
  }
}

export const exerciseService = ExerciseService.getInstance(); 
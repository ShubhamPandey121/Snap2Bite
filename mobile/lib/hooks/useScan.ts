import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { analyzeIngredients } from '../api';
import { insertScan } from '../db';
import { AnalyzeResponse } from '../../types';

/**
 * Explicit union type (matches DB + UI expectations)
 */
type UncertaintyLevel = 'Stable' | 'Drifting' | 'Critical';

export const useScan = (userId: string) => {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const requestPermissions = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Needed',
        'Camera access required for scanning.'
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPerm = await requestPermissions();
    if (!hasPerm) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.base64) {
      await processImage(result.assets[0].base64);
    }
  };

  const pickImage = async () => {
    const hasPerm = await requestPermissions();
    if (!hasPerm) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.base64) {
      await processImage(result.assets[0].base64);
    }
  };

  const processText = async (text: string) => {
    if (!text.trim()) {
      Alert.alert('Invalid', 'Enter ingredients.');
      return;
    }
    await process({ text });
  };

  const processImage = async (base64: string) => {
    await process({ imageBase64: base64 });
  };

  const process = async (payload: {
    text?: string;
    imageBase64?: string;
  }) => {
    if (!userId) return;

    setIsScanning(true);

    try {
      const data: AnalyzeResponse = await analyzeIngredients({
        ...payload,
        userId,
      });

      const scanId =
        Date.now().toString(36) + Math.random().toString(36);

      const regime: UncertaintyLevel =
        data.uncertainty > 0.8
          ? 'Stable'
          : data.uncertainty > 0.6
          ? 'Drifting'
          : 'Critical';

      const scan = {
        id: scanId,
        userId,
        rawIngredients: payload.text ?? 'Image scan',
        summaryVerdict: data.verdict,
        humanInsights: data.insights,
        uncertaintyLevel: regime,
        imageUri: payload.imageBase64,
      };

      insertScan(scan);

      router.push({
        pathname: '/summary',
        params: {
          data: JSON.stringify(data),
          scanId,
        },
      });
    } catch {
      Alert.alert(
        'Scan Failed',
        'Check connection or try clearer image.'
      );
    } finally {
      setIsScanning(false);
    }
  };

  const useSample = () =>
    processText(
      'Sample: High-fructose corn syrup, artificial colors, added sugar'
    );

  return {
    takePhoto,
    pickImage,
    processText,
    useSample,
    isScanning,
  };
};

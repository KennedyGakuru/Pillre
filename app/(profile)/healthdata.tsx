import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface MedicalCondition {
  id: string;
  condition: string;
  diagnosedDate: string;
  notes: string;
}

interface Allergy {
  id: string;
  allergen: string;
  severity: string;
  reaction: string;
}

const healthdata: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Medical Information
  const [bloodType, setBloodType] = useState('A+');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');

  // Medical Conditions
  const [conditions, setConditions] = useState<MedicalCondition[]>([
    {
      id: '1',
      condition: 'Hypertension',
      diagnosedDate: '2023-01-15',
      notes: 'Controlled with medication',
    },
  ]);

  // Allergies
  const [allergies, setAllergies] = useState<Allergy[]>([
    {
      id: '1',
      allergen: 'Peanuts',
      severity: 'Severe',
      reaction: 'Anaphylaxis',
    },
  ]);

  // Insurance Information
  const [insuranceProvider, setInsuranceProvider] = useState('Health Insurance Co.');
  const [policyNumber, setPolicyNumber] = useState('123456789');
  const [groupNumber, setGroupNumber] = useState('GRP001');

  const addCondition = () => {
    const newCondition: MedicalCondition = {
      id: Date.now().toString(),
      condition: '',
      diagnosedDate: '',
      notes: '',
    };
    setConditions(prev => [...prev, newCondition]);
  };

  const updateCondition = (id: string, field: keyof MedicalCondition, value: string) => {
    setConditions(prev =>
      prev.map(condition =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    );
  };

  const deleteCondition = (id: string) => {
    setConditions(prev => prev.filter(condition => condition.id !== id));
  };

  const addAllergy = () => {
    const newAllergy: Allergy = {
      id: Date.now().toString(),
      allergen: '',
      severity: '',
      reaction: '',
    };
    setAllergies(prev => [...prev, newAllergy]);
  };

  const updateAllergy = (id: string, field: keyof Allergy, value: string) => {
    setAllergies(prev =>
      prev.map(allergy =>
        allergy.id === id ? { ...allergy, [field]: value } : allergy
      )
    );
  };

  const deleteAllergy = (id: string) => {
    setAllergies(prev => prev.filter(allergy => allergy.id !== id));
  };

  const handleSave = async () => {
    setError(null);

    try {
      // Validation logic here
      
      // Save logic here
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save health data');
    }
  };

    return(
        <ScrollView style={styles.container}>
      <View style={styles.content}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Blood Type</Text>
              <TextInput
                style={styles.input}
                value={bloodType}
                onChangeText={setBloodType}
                placeholder="Blood type"
                placeholderTextColor="#9CA3AF"
                editable={isEditing}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                placeholder="Height"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                editable={isEditing}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="Weight"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                editable={isEditing}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Conditions</Text>

          {conditions.map(condition => (
            <View key={condition.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Condition</Text>
                {isEditing && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteCondition(condition.id)}
                  >
                    <Ionicons name="trash-bin" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Condition Name</Text>
                <TextInput
                  style={styles.input}
                  value={condition.condition}
                  onChangeText={(text) => updateCondition(condition.id, 'condition', text)}
                  placeholder="Enter condition"
                  placeholderTextColor="#9CA3AF"
                  editable={isEditing}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Diagnosed Date</Text>
                <TextInput
                  style={styles.input}
                  value={condition.diagnosedDate}
                  onChangeText={(text) => updateCondition(condition.id, 'diagnosedDate', text)}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                  editable={isEditing}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={condition.notes}
                  onChangeText={(text) => updateCondition(condition.id, 'notes', text)}
                  placeholder="Additional notes"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                  editable={isEditing}
                />
              </View>
            </View>
          ))}

          {isEditing && (
            <TouchableOpacity style={styles.addButton} onPress={addCondition}>
              <Ionicons name='add' size={20} color="#3B82F6"  />
              <Text style={styles.addButtonText}>Add Condition</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allergies</Text>

          {allergies.map(allergy => (
            <View key={allergy.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Allergy</Text>
                {isEditing && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteAllergy(allergy.id)}
                  >
                    <Ionicons name="trash-bin" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Allergen</Text>
                <TextInput
                  style={styles.input}
                  value={allergy.allergen}
                  onChangeText={(text) => updateAllergy(allergy.id, 'allergen', text)}
                  placeholder="Enter allergen"
                  placeholderTextColor="#9CA3AF"
                  editable={isEditing}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Severity</Text>
                <TextInput
                  style={styles.input}
                  value={allergy.severity}
                  onChangeText={(text) => updateAllergy(allergy.id, 'severity', text)}
                  placeholder="Enter severity"
                  placeholderTextColor="#9CA3AF"
                  editable={isEditing}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Reaction</Text>
                <TextInput
                  style={styles.input}
                  value={allergy.reaction}
                  onChangeText={(text) => updateAllergy(allergy.id, 'reaction', text)}
                  placeholder="Enter reaction"
                  placeholderTextColor="#9CA3AF"
                  editable={isEditing}
                />
              </View>
            </View>
          ))}

          {isEditing && (
            <TouchableOpacity style={styles.addButton} onPress={addAllergy}>
              <Ionicons name='add' size={20} color="#3B82F6"  />
              <Text style={styles.addButtonText}>Add Allergy</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insurance Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Insurance Provider</Text>
            <TextInput
              style={styles.input}
              value={insuranceProvider}
              onChangeText={setInsuranceProvider}
              placeholder="Enter provider name"
              placeholderTextColor="#9CA3AF"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Policy Number</Text>
            <TextInput
              style={styles.input}
              value={policyNumber}
              onChangeText={setPolicyNumber}
              placeholder="Enter policy number"
              placeholderTextColor="#9CA3AF"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Group Number</Text>
            <TextInput
              style={styles.input}
              value={groupNumber}
              onChangeText={setGroupNumber}
              placeholder="Enter group number"
              placeholderTextColor="#9CA3AF"
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Edit Health Data</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 24,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#EBF5FF',
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3B82F6',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4B5563',
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default healthdata;
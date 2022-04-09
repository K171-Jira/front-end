import React from 'react';
import { useForm } from '@mantine/form';
import SignupData from './SignupData';
import { TextInput, Button, Box, Title, Space, Text, Anchor, Alert } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import AuthService from './AuthService';
import { useMutation, useQueryClient } from 'react-query';
import { FiAlertTriangle } from 'react-icons/fi';
import CustomLoader from '../common/CustomLoader';

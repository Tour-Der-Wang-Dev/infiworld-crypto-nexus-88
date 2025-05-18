
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Question, QuestionType } from './TaskList';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, X } from 'lucide-react';

interface TaskFormProps {
  initialValues?: Question;
  onSubmit: (data: Omit<Question, 'id'>) => void;
  onCancel: () => void;
}

const questionTypeOptions: { value: QuestionType; label: string }[] = [
  { value: 'mcq', label: 'Multiple Choice' },
  { value: 'open-ended', label: 'Open-Ended' },
  { value: 'true-false', label: 'True/False' },
];

// Create a schema for the form
const formSchema = z.object({
  type: z.enum(['mcq', 'open-ended', 'true-false'] as const),
  question: z.string().min(1, { message: 'Question text is required' }),
  answer: z.string().min(1, { message: 'Answer is required' }),
  options: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      type: 'mcq',
      question: '',
      answer: '',
      options: ['', '', '', ''],
    },
  });

  const { control, watch, setValue } = form;
  const questionType = watch('type');

  // Field array for MCQ options
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  // Make sure we have options array for MCQ type
  React.useEffect(() => {
    if (questionType === 'mcq' && (!watch('options') || watch('options')?.length === 0)) {
      setValue('options', ['', '', '', '']);
    } 
    else if (questionType === 'true-false') {
      // For true-false, limit answer to either "true" or "false"
      setValue('answer', 'true');
    }
  }, [questionType, setValue, watch]);

  const handleSubmit = (values: FormValues) => {
    // Clean up the data before submission
    const formData: Omit<Question, 'id'> = {
      type: values.type,
      question: values.question,
      answer: values.answer,
    };

    // Include options only for multiple choice questions
    if (values.type === 'mcq' && values.options) {
      // Filter out empty options
      const filteredOptions = values.options.filter(option => option.trim() !== '');
      
      // Make sure we have at least 2 options
      if (filteredOptions.length < 2) {
        form.setError('options', { 
          message: 'Multiple choice questions need at least 2 options' 
        });
        return;
      }
      
      // Make sure the answer is one of the options
      if (!filteredOptions.includes(values.answer)) {
        form.setError('answer', { 
          message: 'Answer must be one of the provided options'
        });
        return;
      }
      
      formData.options = filteredOptions;
    }

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {questionTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter your question here..." 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {questionType === 'mcq' && (
          <div className="space-y-2">
            <FormLabel>Options</FormLabel>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <FormField
                  control={control}
                  name={`options.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder={`Option ${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append('')}
              className="mt-2"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          </div>
        )}

        {questionType === 'mcq' && (
          <FormField
            control={control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {watch('options')?.map((option, index) => (
                      option.trim() !== '' && (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      )
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {questionType === 'true-false' && (
          <FormField
            control={control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {questionType === 'open-ended' && (
          <FormField
            control={control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter the answer here..." 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Save Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

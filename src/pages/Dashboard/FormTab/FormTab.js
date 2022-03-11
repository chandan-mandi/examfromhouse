import React, { useState } from 'react';
import QuestionSet from '../QuestionForm/QuestionSet/QuestionSet';
import { Tab } from '@headlessui/react';
import AllResponses from '../AllResponses/AllResponses';

const FormTab = () => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div>
            <Tab.Group>
                <Tab.List className="w-full flex justify-center p-1 space-x-1 my-2">
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'w-1/3 py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60',
                                selected
                                    ? 'bg-purple-900 text-white shadow'
                                    : 'text-purple-900 shadow-md hover:shadow-lg hover:bg-white hover:text-purple-900'
                            )
                        }
                    >
                        Questions
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'w-1/3 py-2.5 text-sm leading-5 font-medium text-white rounded-lg',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60',
                                selected
                                    ? 'bg-purple-900 text-white shadow'
                                    : 'text-purple-900 shadow-md hover:shadow-lg hover:bg-white hover:text-purple-900'
                            )
                        }
                    >
                        Responses
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <QuestionSet />
                    </Tab.Panel>
                    <Tab.Panel>
                        <AllResponses />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default FormTab;
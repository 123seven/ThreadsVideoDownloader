'use client'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon, CloudArrowDownIcon } from '@heroicons/react/20/solid'

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    phone: '1-493-747-9031',
    email: 'lesliealexander@example.com',
    role: 'Co-Founder / CEO',
    url: 'https://example.com',
    profileUrl: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

const prompts = [
  'Step 1: Open the Threads app on phone.',
  'Step 2: Find the content you want to download and pressing the Copy Link.',
]

const recent = [people[0]]

type Status = 'waitingInput' | 'searching' | 'notFound' | 'found'

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(true)
  const [status, setStatus] = useState<Status>('waitingInput')



  const filteredPeople =
    query === ''
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  function setContent(event: any) {
    console.log(event.target.value)
    if (event.target.value === '') {
      setStatus('waitingInput')
    } else {
      setQuery(event.target.value)
      setStatus('searching')
      searchQuery()
    }
  }

  function searchQuery() {
    setStatus('searching')
    setTimeout(() => {
      setStatus('notFound')
    }, 2000)
  }

  return (
    <Transition.Root
      show={true}
      as={Fragment}

      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox
                onChange={(person) => (window.location = person.profileUrl)}
              >
                {({ activeOption }) => (
                  <>
                    <div className="relative">
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        value={query}
                        // onChange={(event) => setContent(event)}
                      />
                    </div>


                    {status == 'waitingInput' && (
                      <Combobox.Options
                        static
                        className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                      >
                        {prompts.map((item, index) => (
                          <Combobox.Option
                            disabled
                            key={index}
                            value={item}
                            className={({ active }) =>
                              classNames(
                                'cursor-default select-none px-4 py-2',
                                active && 'bg-indigo-600 text-white'
                              )
                            }
                          >
                            {item}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    )}

                    {status == 'searching' && (
                      <Combobox.Options
                        static
                        className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                      >
                        <Combobox.Option
                          disabled
                          value={'searching'}
                          className="cursor-default select-none px-4 py-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1 min-w-0">
                              <CloudArrowDownIcon className="animate-ping h-3 w-3"></CloudArrowDownIcon>
                              <span className="truncate ml-3">
                                Searching...
                              </span>
                            </div>
                          </div>
                        </Combobox.Option>
                      </Combobox.Options>
                    )}

                    {status == 'found' && (
                      <Combobox.Options
                        as="div"
                        static
                        hold
                        className="flex divide-x divide-gray-100"
                      >
                        <div
                          className={classNames(
                            'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                            activeOption && 'sm:h-96'
                          )}
                        >
                          {query === '' && (
                            <h2 className="mt-2 mb-4 text-xs font-semibold text-gray-500">
                              Recent searches
                            </h2>
                          )}
                          <div className="-mx-2 text-sm text-gray-700">
                            {(query === '' ? recent : filteredPeople).map(
                              (person) => (
                                <Combobox.Option
                                  as="div"
                                  key={person.id}
                                  value={person}
                                  className={({ active }) =>
                                    classNames(
                                      'flex cursor-default select-none items-center rounded-md p-2',
                                      active && 'bg-gray-100 text-gray-900'
                                    )
                                  }
                                >
                                  {({ active }) => (
                                    <>
                                      <img
                                        src={person.imageUrl}
                                        alt=""
                                        className="h-6 w-6 flex-none rounded-full"
                                      />
                                      <span className="ml-3 flex-auto truncate">
                                        {person.name}
                                      </span>
                                      {active && (
                                        <ChevronRightIcon
                                          className="ml-3 h-5 w-5 flex-none text-gray-400"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </>
                                  )}
                                </Combobox.Option>
                              )
                            )}
                          </div>
                        </div>

                        {activeOption && (
                          <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                            <div className="flex-none p-6 text-center">
                              <img
                                src={activeOption.imageUrl}
                                alt=""
                                className="mx-auto h-16 w-16 rounded-full"
                              />
                              <h2 className="mt-3 font-semibold text-gray-900">
                                {activeOption.name}
                              </h2>
                              <p className="text-sm leading-6 text-gray-500">
                                {activeOption.role}
                              </p>
                            </div>
                            <div className="flex flex-auto flex-col justify-between p-6">
                              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                                <dt className="col-end-1 font-semibold text-gray-900">
                                  Phone
                                </dt>
                                <dd>{activeOption.phone}</dd>
                                <dt className="col-end-1 font-semibold text-gray-900">
                                  URL
                                </dt>
                                <dd className="truncate">
                                  <a
                                    href={activeOption.url}
                                    className="text-indigo-600 underline"
                                  >
                                    {activeOption.url}
                                  </a>
                                </dd>
                                <dt className="col-end-1 font-semibold text-gray-900">
                                  Email
                                </dt>
                                <dd className="truncate">
                                  <a
                                    href={`mailto:${activeOption.email}`}
                                    className="text-indigo-600 underline"
                                  >
                                    {activeOption.email}
                                  </a>
                                </dd>
                              </dl>
                              <button
                                type="button"
                                className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Send message
                              </button>
                            </div>
                          </div>
                        )}
                      </Combobox.Options>
                    )}

                    {status == 'notFound' && (
                      <div className="py-14 px-6 text-center text-sm sm:px-14">
                        <UsersIcon
                          className="mx-auto h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900">
                          No people found
                        </p>
                        <p className="mt-2 text-gray-500">
                          We couldn’t find anything with that term. Please try
                          again.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

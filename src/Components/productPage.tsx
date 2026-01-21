import React from 'react';
import { Check } from 'lucide-react';

export default function LeadaxFlashingPage() {
    return (
        <div className=" flex items-center justify-center p-8">
            <div className=" max-w-350 w-full px-2 lg:px-0 lg:w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Product Image */}
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&h=400&fit=crop"
                            alt="Leadax Flashing Roll"
                            className="w-full max-w-md drop-shadow-2xl"
                        />
                    </div>

                    {/* Color Options */}
                    <div className="flex gap-4 mt-8">
                        <button className="w-5 h-5 rounded-full bg-gray-400 border-2 border-gray-600 hover:scale-110 transition-transform"></button>
                        <button className="w-5 h-5 rounded-full bg-red-400 border-2 border-transparent hover:scale-110 transition-transform"></button>
                        <button className="w-5 h-5 rounded-full bg-gray-800 border-2 border-transparent hover:scale-110 transition-transform"></button>
                    </div>
                </div>

                {/* Right Side - Product Information */}
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Leadax Flashing Easy FA
                    </h1>

                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        The fully self-adhesive lead replacement, made to be applied as quickly and easily as possible.
                    </p>

                    {/* Features List */}
                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 shrink-0" />
                            <span className="text-base text-gray-800">Extremely strong</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 shrink-0" />
                            <span className="text-base text-gray-800">Lightweight</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600 shrink-0" />
                            <span className="text-base text-gray-800">Available in different colors and sizes</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-3 bg-primary-500  cursor-pointer text-white font-normal rounded-full transition-colors shadow-md">
                            Receive a free sample
                        </button>
                        <button className="px-8 py-3 bg-white cursor-pointer  hover:bg-gray-50 text-gray-900 font-normal rounded-full border-2 border-gray-300 transition-colors">
                            Find a dealer
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating CTA */}
            <div className="fixed bottom-8 right-8 bg-white rounded-full shadow-xl px-6 py-4 border border-gray-200 hover:shadow-2xl transition-shadow cursor-pointer group">
                <div className="flex items-center gap-2">
                    <span className="font-normal text-gray-900">Looking for a free sample? </span>
                </div>
            </div>
        </div>
    );
}
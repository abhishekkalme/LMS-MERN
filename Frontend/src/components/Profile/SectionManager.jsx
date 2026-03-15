import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiAddLine, RiDeleteBin6Line, RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";

const SectionManager = ({ isOpen, onClose, sections, onSave }) => {
  const [localSections, setLocalSections] = useState(sections || []);

  const handleAdd = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "New Section",
      content: "Add your details here...",
      icon: "bookmark",
      order: localSections.length
    };
    setLocalSections([...localSections, newSection]);
  };

  const handleUpdate = (id, field, value) => {
    setLocalSections(localSections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDelete = (id) => {
    setLocalSections(localSections.filter(s => s.id !== id));
  };

  const move = (index, direction) => {
    const newSections = [...localSections];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setLocalSections(newSections.map((s, i) => ({ ...s, order: i })));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="px-8 py-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
              <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Manage Custom Sections</h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"><RiCloseLine size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-none">
                {localSections.map((section, index) => (
                    <div key={section.id} className="p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-4 bg-gray-50/50 dark:bg-black/20 group">
                        <div className="flex items-center justify-between gap-4">
                            <input 
                                type="text"
                                value={section.title}
                                placeholder="Section Title"
                                onChange={(e) => handleUpdate(section.id, 'title', e.target.value)}
                                className="flex-1 bg-transparent text-lg font-bold text-gray-900 dark:text-white outline-none focus:border-b border-indigo-500"
                            />
                            <div className="flex items-center gap-2">
                                <button onClick={() => move(index, -1)} className="p-2 hover:text-indigo-500 transition-colors"><RiArrowUpLine /></button>
                                <button onClick={() => move(index, 1)} className="p-2 hover:text-indigo-500 transition-colors"><RiArrowDownLine /></button>
                                <button onClick={() => handleDelete(section.id)} className="p-2 text-red-400 hover:text-red-500 transition-colors"><RiDeleteBin6Line /></button>
                            </div>
                        </div>
                        <textarea 
                            value={section.content}
                            placeholder="Write something impressive..."
                            onChange={(e) => handleUpdate(section.id, 'content', e.target.value)}
                            rows={3}
                            className="w-full bg-transparent text-sm text-gray-600 dark:text-gray-400 outline-none resize-none focus:ring-1 ring-indigo-500/20 rounded-lg p-2"
                        />
                    </div>
                ))}

                <button 
                    onClick={handleAdd}
                    className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-100 dark:border-zinc-800 text-gray-400 hover:text-indigo-500 hover:border-indigo-500 transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
                >
                    <RiAddLine size={20} /> Add New Section
                </button>
            </div>

            <div className="px-8 py-6 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-black/40 flex justify-end gap-4">
                <button onClick={onClose} className="px-6 py-2 font-bold text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                <button 
                    onClick={() => { onSave(localSections); onClose(); }}
                    className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
                >
                    Save Configuration
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SectionManager;

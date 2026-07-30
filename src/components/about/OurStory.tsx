export default function OurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Legacy of Precision</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded on the principles of exactitude and elegance, ChronoCraft has been at the forefront of horological innovation. We believe that a watch is more than a tool for telling time; it is a testament to human ingenuity and a companion for life's most significant moments.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every piece in our collection is meticulously curated and inspected to ensure it meets our rigorous standards. Whether you are seeking a rugged diver, a sleek dress watch, or a complex chronograph, our commitment to excellence remains unwavering.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=2070&auto=format&fit=crop" alt="Watch mechanism" className="rounded-xl shadow-lg w-full h-64 object-cover" />
            <img src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop" alt="Elegant watch" className="rounded-xl shadow-lg w-full h-64 object-cover mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

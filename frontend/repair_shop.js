const fs = require('fs');

const file = 'src/components/ShopSection.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\r\n/g, '\n');

const target = `                            )}
                        </div>
                                >
                                    01`;

const replacement = `                            )}
                        </div>
                        {/* Pagination Start */}
                        <ul className="pagination flex-center flex-wrap gap-16">
                            <li className="page-item">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    <i className="ph-bold ph-arrow-left" />
                                </Link>
                            </li>
                            <li className="page-item active">
                                <Link
                                    className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                                    to="#"
                                >
                                    01`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully repaired the file!");
} else {
    console.log("Target not found!");
}
